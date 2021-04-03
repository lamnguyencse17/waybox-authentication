import TokenModel from "../models/tokens";
import { nanoid, customAlphabet } from "nanoid/async";
import {
	IOtpTokenPayload,
	otpTokenPayloadSchema,
	IOtpCheck,
	IOtpReturnedTokens,
} from "./interfaces/tokens";
import jwt from "jsonwebtoken";

const generateRandomOtpText = async (): Promise<string> => await nanoid();

const otpGenerator = customAlphabet("1234567890", 6);
const generateRandomOtpCode = async (): Promise<string> => await otpGenerator();

const generateOtpToken = async (phoneNumber: string): Promise<any> => {
	const randomOtpText = await generateRandomOtpText();
	const otpCode = await generateRandomOtpCode();
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

export const generateReturnedTokens = (
	phoneNumber: string
): IOtpReturnedTokens => {
	const accessToken = generateAccessToken(phoneNumber);
	const refreshToken = generateRefreshToken(phoneNumber);
	return { accessToken, refreshToken };
};

const generateAccessToken = (phoneNumber: string): string => {
	return jwt.sign(
		{
			IS_ACCESS_TOKEN: true,
			USER_ID: phoneNumber,
		},
		"bikepicker1234",
		{ expiresIn: "300s" }
	);
};

const generateRefreshToken = (phoneNumber: string): string => {
	return jwt.sign(
		{
			IS_REFRESH_TOKEN: true,
			USER_ID: phoneNumber,
		},
		"bikepicker1234",
		{ expiresIn: "300s" }
	);
};

export const verifyOtpToken = async (
	otpInput: IOtpCheck
): Promise<IOtpReturnedTokens> => {
	const { randomOtpText, phoneNumber, otpCode } = otpInput;
	const tokenResult = await TokenModel.findOne({
		otpRandom: randomOtpText,
		phoneNumber,
		otpCode,
	});
	if (!tokenResult) {
		throw "INVALID TOKEN";
	}
	const { accessToken, refreshToken } = generateReturnedTokens(phoneNumber);
	tokenResult.accessToken = accessToken;
	tokenResult.refreshToken = refreshToken;
	await tokenResult.save();
	return { accessToken, refreshToken };
};

export const decodeOtpToken = async (
	otpToken: string
): Promise<IOtpTokenPayload> => {
	const decodedPayload = jwt.verify(otpToken, "bikepicker1234");
	if (typeof decodedPayload === "string") {
		throw "INVALID OTP TOKEN";
	}
	const verifiedPayload = await otpTokenPayloadSchema.validate(decodedPayload);
	return verifiedPayload;
};

export const generateLoginToken = generateRegisterToken;
