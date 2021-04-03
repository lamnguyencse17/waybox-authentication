import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface verifyOtpInput
	extends yup.Asserts<typeof verifyOtpInputSchema> {}

export const verifyOtpInputSchema = yup.object({
	username: yup.string().required().defined().min(10),
	otpCode: yup.string().required().defined().length(6),
	otpToken: yup
		.string()
		.required()
		.defined()
		.matches(/^\$2[ayb]\$.+$/),
});
