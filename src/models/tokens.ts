import mongoose, { Schema } from "mongoose";
import { IToken } from "./interfaces/tokens";

const TokenSchema: Schema = new Schema({
	accessToken: { type: String },
	refreshToken: { type: String },
	otpToken: { type: String },
	otp: { type: String },
});

TokenSchema.index({ phone: 1 }, { unique: true });

export default mongoose.model<IToken>("Token", TokenSchema);
