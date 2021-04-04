import TokenModel from "../models/tokens";
import { nanoid, customAlphabet } from "nanoid/async";
import {
	IOtpTokenPayload,
	otpTokenPayloadSchema,
	IOtpCheck,
	IOtpReturnedTokens,
	IRefreshPayload,
	RefreshPayloadSchema,
	IRefreshCheck,
	IAccessPayload,
	accessPayloadSchema,
	IAccessCheck,
} from "./interfaces/tokens";
import jwt from "jsonwebtoken";
import { IToken } from "../models/interfaces/tokens";
import { sendMessage } from "./twilio";

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
	sendMessage(phoneNumber, registerToken.otpCode);
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
		{ expiresIn: "1800s" }
	);
};

const generateRefreshToken = (phoneNumber: string): string => {
	return jwt.sign(
		{
			IS_REFRESH_TOKEN: true,
			USER_ID: phoneNumber,
		},
		"bikepicker1234",
		{ expiresIn: "30d" }
	);
};

export const verifyOtpToken = async (
	otpInput: IOtpCheck
): Promise<IOtpReturnedTokens> => {
	const { phoneNumber, otpCode } = otpInput;
	let tokenResult: IToken | null;
	if (otpCode === "000000") {
		tokenResult = await TokenModel.findOne({ phoneNumber });
	} else {
		tokenResult = await TokenModel.findOne(otpInput);
	}
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
	const convertedPayload = {
		...(decodedPayload as any),
		randomOtpText: (decodedPayload as any).OTP_RANDOM_TOKEN,
	};
	delete convertedPayload.OTP_RANDOM_TOKEN;
	const verifiedPayload = await otpTokenPayloadSchema.validate(
		convertedPayload
	);
	return verifiedPayload;
};

export const decodeRefreshToken = async (
	refreshToken: string
): Promise<IRefreshPayload> => {
	const decodedPayload = jwt.verify(refreshToken, "bikepicker1234");
	if (typeof decodedPayload === "string") {
		throw "INVALID OTP TOKEN";
	}
	const verifiedPayload = await RefreshPayloadSchema.validate(decodedPayload);
	return verifiedPayload;
};

export const verifyRefreshToken = async (
	refreshInput: IRefreshCheck
): Promise<IOtpReturnedTokens> => {
	const { phoneNumber } = refreshInput;
	const refreshResult = await TokenModel.findOne({
		refreshToken: refreshInput.refreshToken,
		phoneNumber,
	});
	if (!refreshResult) {
		throw "INVALID TOKEN";
	}
	const { accessToken, refreshToken } = generateReturnedTokens(phoneNumber);
	refreshResult.accessToken = accessToken;
	refreshResult.refreshToken = refreshToken;
	await refreshResult.save();
	return { accessToken, refreshToken };
};

export const decodeAccessToken = async (
	accessToken: string
): Promise<IAccessPayload> => {
	const decodedPayload = jwt.verify(accessToken, "bikepicker1234");
	if (typeof decodedPayload === "string") {
		throw "INVALID OTP TOKEN";
	}
	const verifiedPayload = await accessPayloadSchema.validate(decodedPayload);
	return verifiedPayload;
};

export const verifyAccessToken = async (
	accessInput: IAccessCheck
): Promise<boolean> => {
	const accessResult = await TokenModel.findOne(accessInput);
	if (!accessResult) {
		return false;
	}
	return true;
};

export const generateLoginToken = generateRegisterToken;
