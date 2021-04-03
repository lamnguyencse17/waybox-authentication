import * as yup from "yup";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface verifyAccessInput
	extends yup.Asserts<typeof verifyAccessInputSchema> {}

export const verifyAccessInputSchema = yup.object({
	token: yup
		.string()
		.required()
		.defined()
		.matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
});
