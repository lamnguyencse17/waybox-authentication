module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "prettier"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"prettier/prettier": [
			1,
			{
				trailingComma: "es5",
				singleQuote: false,
				semi: true,
				useTabs: true,
			},
		],
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		...require("eslint-config-prettier").rules,
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		...require("eslint-config-prettier/@typescript-eslint").rules,
	},
};
