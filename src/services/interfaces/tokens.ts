import * as yup from "yup";

// export interface IotpTokenPayload {
// 	randomOtpText: string;
// 	phoneNumber: string;
// 	otpCode: string;
// 	otpToken: string;
// }
export type IOtpTokenPayload = yup.Asserts<typeof otpTokenPayloadSchema>;

export const otpTokenPayloadSchema = yup.object({
	USER_ID: yup.string().required().defined().min(10),
	randomOtpText: yup.string().email().required().defined().length(21),
	exp: yup.number().required().defined(),
});

export interface IOtpCheck {
	phoneNumber: string;
	otpCode: string;
	randomOtpText: string;
}

export interface IOtpReturnedTokens {
	accessToken: string;
	refreshToken: string;
}
