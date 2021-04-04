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
export interface createUserInput
	extends yup.Asserts<typeof createUserInputSchema> {}

export const createUserInputSchema = yup.object({
	phoneNumber: yup.string().required().defined().min(10),
	email: yup.string().email().required().defined(),
	password: yup
		.string()
		.required()
		.defined()
		.matches(/^\$2[ayb]\$.+$/),
	dateOfBirth: yup.date().required().defined(),
	firstName: yup.string().required().defined().min(1),
	lastName: yup.string().required().defined().min(1),
	female: yup.boolean().required().defined(),
	address: yup.string().required().defined().min(1),
});

export type userData = Omit<createUserInput, "password">;
