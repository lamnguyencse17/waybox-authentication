import bcrypt from "bcrypt";

export default async (password: string, hash: string): Promise<boolean> =>
	await bcrypt.compare(password, hash);
