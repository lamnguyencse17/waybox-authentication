import { Request, Response } from "express";
import { BAD_REQUEST, OK_RESPONSE } from "../../constants/response";
import { registerInputSchema } from "./interfaces/registerInterface";
import hashPassword from "../../utils/hashPassword";
import { createNewUser } from "../../services/users";
import { generateRegisterToken } from "../../services/tokens";

interface authenticatedRequest extends Request {
	phone: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (
	req: authenticatedRequest,
	res: Response
): Promise<any> => {
	try {
		const validatedRegisterRequest = await registerInputSchema.validate(
			req.body,
			{
				abortEarly: true,
			}
		);
		validatedRegisterRequest.password = await hashPassword(
			validatedRegisterRequest.password
		);
		const { phoneNumber } = await createNewUser(validatedRegisterRequest);
		const { otpToken } = await generateRegisterToken(phoneNumber);
		return res.status(OK_RESPONSE).json({ otpToken });
	} catch (err) {
		return res.status(BAD_REQUEST).json({ message: err });
	}
};
