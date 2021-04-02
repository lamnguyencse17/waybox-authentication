import * as yup from "yup";

// export interface createUserInput {
// 	phoneNumber: string;
// 	email: string;
// 	password: string;
// 	dateOfBirth: Date;
// 	firstName: string;
// 	lastName: string;
// 	female: boolean;
// 	address: string;
// }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface loginInput extends yup.Asserts<typeof LoginInputSchema> {}

export const LoginInputSchema = yup.object({
	username: yup.string().required().defined().min(10),
	password: yup.string().required().defined().min(8),
});
