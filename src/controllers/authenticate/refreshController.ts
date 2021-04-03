import { Request, Response } from "express";
import {
	BAD_REQUEST,
	OK_RESPONSE,
	UNAUTHORIZED,
} from "../../constants/response";
import { decodeRefreshToken, verifyRefreshToken } from "../../services/tokens";
import {
	refreshTokenInput,
	refreshTokenSchema,
} from "./interfaces/refreshInterface";

interface authenticatedRequest extends Request {
	phone: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (
	req: authenticatedRequest,
	res: Response
): Promise<any> => {
	let refreshTokenRequest: refreshTokenInput;
	try {
		refreshTokenRequest = await refreshTokenSchema.validate(req.body, {
			abortEarly: true,
		});
	} catch ({ message }) {
		return res.status(BAD_REQUEST).json({ message });
	}
	try {
		const { username, refreshToken } = refreshTokenRequest;
		const { USER_ID: phoneNumber } = await decodeRefreshToken(refreshToken);
		if (username !== phoneNumber) {
			return res
				.status(UNAUTHORIZED)
				.json({ message: "MISMATCH TOKEN AND USERNAME" });
		}
		const tokens = await verifyRefreshToken({ phoneNumber, refreshToken });
		return res.status(OK_RESPONSE).json({ ...tokens });
	} catch (err) {
		return res.status(BAD_REQUEST).json({ message: err });
	}
};
