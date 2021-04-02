import { registerInput } from "../controllers/authenticate/interfaces/registerInterface";
import { IPlainUser } from "../models/interfaces/users";
import UserModel from "../models/users";
import { createUserInputSchema, createUserInput } from "./interfaces/users";

export const createNewUser = async (
	newUserInput: registerInput
): Promise<IPlainUser> => {
	let validatedUserInput: createUserInput;
	try {
		validatedUserInput = await createUserInputSchema.validate(newUserInput);
	} catch (err) {
		console.error(err);
		throw "ERROR VALIDATING BCRYPT HASH";
	}
	try {
		const user = await UserModel.create(validatedUserInput);
		return user.toJSON();
	} catch (err) {
		console.error(err);
		throw "ERROR CREATING USER";
	}
};
