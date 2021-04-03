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
	randomOtpText: yup.string().required().defined().length(21),
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

export type IRefreshPayload = yup.Asserts<typeof RefreshPayloadSchema>;

export const RefreshPayloadSchema = yup.object({
	USER_ID: yup.string().required().defined().min(10),
	IS_REFRESH_TOKEN: yup.boolean().required("IS NOT REFRESH TOKEN").defined(),
	exp: yup.number().required().defined(),
});

export interface IRefreshCheck {
	phoneNumber: string;
	refreshToken: string;
}

export type IAccessPayload = yup.Asserts<typeof accessPayloadSchema>;

export const accessPayloadSchema = yup.object({
	USER_ID: yup.string().required().defined().min(10),
	IS_ACCESS_TOKEN: yup.boolean().required("IS NOT REFRESH TOKEN").defined(),
	exp: yup.number().required().defined(),
});

export interface IAccessCheck {
	phoneNumber: string;
	accessToken: string;
}
