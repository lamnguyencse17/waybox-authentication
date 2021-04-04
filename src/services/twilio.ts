import { Twilio } from "twilio";

const authToken = process.env.TWILIO_TOKEN;
const accountSid = process.env.TWILIO_SID;
const serviceSid = process.env.TWILIO_SERVICESID;

let twilioClient: Twilio;

export const initTwilio = (): void => {
	if (accountSid === undefined || authToken === undefined) {
		console.log("Twilio did not init");
		return;
	}
	twilioClient = new Twilio(accountSid, authToken);
};

const whitelistedPhoneNumber = [
	"0919696148",
	"0869102317",
	"0971126179",
	"0971128286",
];

export const sendMessage = (phoneNumber: string, otpCode: string): void => {
	if (serviceSid === undefined) {
		console.error("Twilio did not send message");
		return;
	}
	if (!whitelistedPhoneNumber.includes(phoneNumber)) {
		console.info("PHONE IS NOT ALLOWED TO RECEIVE OTP");
		return;
	}
	twilioClient.messages
		.create({
			messagingServiceSid: serviceSid,
			to: `+84${phoneNumber.substr(1)}`,
			body: `Your Waybox OTP is ${otpCode}`,
		})
		.then((message) =>
			console.log(
				`Message SID: ${message.sid}\nMessage Receiver: ${message.to}\nMessage Content: ${message.body}`
			)
		)
		.catch((err) => console.error(err));
};
