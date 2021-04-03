import { Request, Response } from "express";
import {
	BAD_REQUEST,
	OK_RESPONSE,
	UNAUTHORIZED,
} from "../../constants/response";
import { decodeAccessToken, verifyAccessToken } from "../../services/tokens";
import {
	verifyAccessInput,
	verifyAccessInputSchema,
} from "./interfaces/verifyInterface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (req: Request, res: Response): Promise<any> => {
	let validatedAccessRequest: verifyAccessInput;
	try {
		validatedAccessRequest = await verifyAccessInputSchema.validate(req.body, {
			abortEarly: true,
		});
	} catch ({ message }) {
		return res.status(BAD_REQUEST).json({ message });
	}
	try {
		const { token: accessToken } = validatedAccessRequest;
		const { USER_ID: phoneNumber } = await decodeAccessToken(accessToken);
		const accessCheck = await verifyAccessToken({ phoneNumber, accessToken });
		if (!accessCheck) {
			return res.status(UNAUTHORIZED).json({ message: "TOKEN INVALID" });
		}
		return res.status(OK_RESPONSE).send(phoneNumber);
	} catch (err) {
		return res.status(BAD_REQUEST).json({ message: err });
	}
};
