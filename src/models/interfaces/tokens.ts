import { Document } from "mongoose";

export interface IToken extends Document {
	phoneNumber: string;
	accessToken?: string;
	refreshToken?: string;
	otpToken?: string;
	otp?: string;
	otpRandom?: string;
}

export interface IPlainToken {
	phoneNumber: string;
	accessToken?: string;
	refreshToken?: string;
	otpToken?: string;
	otp?: string;
	otpRandom?: string;
}
