import { Document } from "mongoose";

export interface IToken extends Document {
	accessToken: string;
	refreshToken: string;
	otpToken: string;
	otp: string;
}

export interface IPlainToken {
	accessToken: string;
	refreshToken: string;
	otpToken: string;
	otp: string;
}
