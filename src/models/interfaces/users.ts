import { Document } from "mongoose";

export interface IUser extends Document {
	phoneNumber: string;
	email: string;
	password: string;
	dateOfBirth: string;
	firstName: string;
	lastName: string;
	female: boolean;
	address: string;
}

export interface IPlainUser {
	phoneNumber: string;
	email: string;
	password: string;
	dateOfBirth: string;
	firstName: string;
	lastName: string;
	female: boolean;
	address: string;
}
