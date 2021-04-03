import { Request, Response } from "express";
import { BAD_REQUEST, OK_RESPONSE } from "../../constants/response";
import {
	generateLoginToken,
	verifyOtpToken,
	decodeOtpToken,
} from "../../services/tokens";
import { loginUser } from "../../services/users";
import {
	verifyOtpInput,
	verifyOtpInputSchema,
} from "./interfaces/verifyOtpInterface";

interface authenticatedRequest extends Request {
	phone: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (
	req: authenticatedRequest,
	res: Response
): Promise<any> => {
	let validatedOtpRequest: verifyOtpInput;
	try {
		validatedOtpRequest = await verifyOtpInputSchema.validate(req.body, {
			abortEarly: true,
		});
	} catch ({ message }) {
		return res.status(BAD_REQUEST).json({ message });
	}
	try {
		const { otpToken, otpCode } = validatedOtpRequest;
		const { USER_ID: phoneNumber, randomOtpText } = await decodeOtpToken(
			otpToken
		);
		const tokens = await verifyOtpToken({
			phoneNumber,
			randomOtpText,
			otpCode,
		});
		return res.status(OK_RESPONSE).json({ ...tokens });
	} catch (err) {
		return res.status(BAD_REQUEST).json({ message: err });
	}
};
