export default [
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: {
			next: require("eslint-plugin-next"),
		},
		rules: {
			"react/react-in-jsx-scope": "off",
		},
	},
];
