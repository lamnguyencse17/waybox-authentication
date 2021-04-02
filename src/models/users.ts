import mongoose, { Schema } from "mongoose";
import { IUser } from "./interfaces/users";

const UserSchema: Schema = new Schema({
	phoneNumber: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	dateOfBirth: { type: Date, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	female: { type: Boolean, required: true },
	address: { type: String, required: true },
});

UserSchema.index({ phone: 1 }, { unique: true });

export default mongoose.model<IUser>("User", UserSchema);
