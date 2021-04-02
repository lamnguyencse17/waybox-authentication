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
export interface registerInput
	extends yup.Asserts<typeof registerInputSchema> {}

export const registerInputSchema = yup.object({
	phoneNumber: yup.string().required().defined().min(8),
	email: yup.string().email().required().defined(),
	password: yup
		.string()
		.required()
		.defined()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/
		),
	dateOfBirth: yup.date().required().defined(),
	firstName: yup.string().required().defined().min(1),
	lastName: yup.string().required().defined().min(1),
	female: yup.boolean().required().defined(),
	address: yup.string().required().defined().min(1),
});
