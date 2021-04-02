import mongoose, { Schema } from "mongoose";
import { IToken } from "./interfaces/tokens";

const TokenSchema: Schema = new Schema({
	accessToken: { type: String },
	refreshToken: { type: String },
	otpToken: { type: String },
	otpCode: { type: String },
	otpRandom: { type: String },
	phoneNumber: { type: String, required: true },
});

TokenSchema.index({ phoneNumber: 1 }, { unique: true });

export default mongoose.model<IToken>("Token", TokenSchema);
