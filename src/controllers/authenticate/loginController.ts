import { Request, Response } from "express";
import { BAD_REQUEST, OK_RESPONSE } from "../../constants/response";
import { generateLoginToken } from "../../services/tokens";
import { loginUser } from "../../services/users";
import { loginInput, LoginInputSchema } from "./interfaces/loginInterface";

interface authenticatedRequest extends Request {
	phone: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (
	req: authenticatedRequest,
	res: Response
): Promise<any> => {
	let validatedLoginRequest: loginInput;
	try {
		validatedLoginRequest = await LoginInputSchema.validate(req.body, {
			abortEarly: true,
		});
	} catch ({ message }) {
		return res.status(BAD_REQUEST).json({ message });
	}
	try {
		const { phoneNumber } = await loginUser(validatedLoginRequest);
		const { otpToken } = await generateLoginToken(phoneNumber);
		return res.status(OK_RESPONSE).json({ otpToken });
	} catch (err) {
		return res.status(BAD_REQUEST).json({ message: err });
	}
};
