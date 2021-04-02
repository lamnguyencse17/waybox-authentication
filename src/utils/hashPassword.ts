import bcrypt from "bcrypt";

const saltRounds = 12;

export default async (password: string): Promise<string> => {
	try {
		return await bcrypt.hash(password, saltRounds);
	} catch (err) {
		console.error(err);
		throw "ERROR HASHING PASSWORD";
	}
};
