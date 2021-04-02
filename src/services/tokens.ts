import TokenModel from "../models/tokens";
import { nanoid, customAlphabet } from "nanoid/async";
import jwt from "jsonwebtoken";

const generateRandomOtpText = async (): Promise<string> => await nanoid();

const otpGenerator = customAlphabet("1234567890", 6);
const generateRandomOtpCode = async (): Promise<string> => await otpGenerator();

const generateOtpToken = async (phoneNumber: string) => {
	const randomOtpText = await generateRandomOtpText();
	const otpCode = await generateRandomOtpCode();
	try {
		const otpToken = jwt.sign(
			{
				USER_ID: phoneNumber,
				OTP_RANDOM_TOKEN: randomOtpText,
			},
			"bikepicker1234",
			{ expiresIn: "120s" }
		);
		return {
			randomOtpText,
			phoneNumber,
			otpCode,
			otpToken,
		};
	} catch (err) {
		console.error(err);
	}
};

export const generateRegisterToken = async (
	phoneNumber: string
): Promise<{ otpToken: string }> => {
	const registerToken = await generateOtpToken(phoneNumber);
	console.log("REGISTER TOKEN: ", JSON.stringify(registerToken, null, 4));
	const savedToken = await TokenModel.findOneAndUpdate(
		{ phoneNumber },
		registerToken,
		{ upsert: true, new: true }
	);
	if (!savedToken || savedToken.otpToken === undefined) {
		throw "GENERATE OTP TOKEN FAILED";
	}
	const otpToken = savedToken.otpToken;
	console.log("SAVED TOKEN: ", otpToken);
	return { otpToken };
};

export const generateLoginToken = generateRegisterToken;
