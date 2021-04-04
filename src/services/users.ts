import { loginInput } from "../controllers/authenticate/interfaces/loginInterface";
import { registerInput } from "../controllers/authenticate/interfaces/registerInterface";
import { IPlainUser } from "../models/interfaces/users";
import UserModel from "../models/users";
import {
	createUserInputSchema,
	createUserInput,
	userData,
} from "./interfaces/users";
import verifyPassword from "../utils/verifyPassword";
import axios from "axios";

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
		const user = new UserModel(validatedUserInput);
		// const user = await UserModel.create(validatedUserInput);
		const { password, ...pushData } = validatedUserInput;
		await pushDataToManagement(pushData);
		await user.save();
		return user.toJSON();
	} catch (err) {
		console.error(err);
		throw "ERROR CREATING USER";
	}
};

export const loginUser = async (userLogin: loginInput): Promise<IPlainUser> => {
	const { username, password } = userLogin;
	const requestedUser = await getUserFromPhoneNumber(username);
	const passwordHash = requestedUser.password;
	const isPasswordMatch = await verifyPassword(password, passwordHash);
	if (!isPasswordMatch) {
		throw "PASSWORD DOES NOT MATCH";
	}
	return requestedUser;
};

export const getUserFromPhoneNumber = async (
	phoneNumber: string
): Promise<IPlainUser> => {
	const user = await UserModel.findOne({ phoneNumber }).lean();
	if (!user) {
		throw "NO USER FOUND";
	}
	return user;
};

export const pushDataToManagement = async (
	pushData: userData
): Promise<void> => {
	if (process.env.ManagementURL === undefined) {
		throw "Required URL Not Found";
	}
	const pushUserURL = `${process.env.ManagementURL}/admin/user`;
	await axios.post(pushUserURL, pushData);
};
