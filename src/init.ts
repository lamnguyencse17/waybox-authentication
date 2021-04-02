import mongoose from "mongoose";

const mongodbURI =
	process.env.MongoDBURI === undefined
		? "mongodb://localhost:27017/waybox-authentication?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
		: process.env.MongoDBURI;

export const initMongoose = (): void => {
	mongoose.connect(mongodbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
};
