module.exports = {
	apps: [
		{
			script: "build/src/server.js",
			watch: ".",
			instances: 3,
			exec_mode: "cluster",
		},
	],
};
