import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface refreshTokenInput
	extends yup.Asserts<typeof refreshTokenSchema> {}

export const refreshTokenSchema = yup.object({
	username: yup.string().required().defined().min(10),
	refreshToken: yup
		.string()
		.required()
		.defined()
		.matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
});
