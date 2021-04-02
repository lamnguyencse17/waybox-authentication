import { Request, Response } from "express";
import { BAD_REQUEST, OK_RESPONSE } from "../../constants/response";
import { adminGetRideList } from "../../services/ride";

interface authenticatedRequest extends Request {
	phone: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (
	req: authenticatedRequest,
	res: Response
): Promise<any> => {
	const limit =
		req.query.limit === undefined ? 5 : parseInt(req.query.limit.toString());
	const offset =
		req.query.offset === undefined ? 0 : parseInt(req.query.offset.toString());
	try {
		const rideData = await adminGetRideList({ limit, offset });
		return res.status(OK_RESPONSE).json({ ...rideData });
	} catch (message) {
		return res.status(BAD_REQUEST).json({ message });
	}
};
