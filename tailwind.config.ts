import type { Config } from "tailwindcss";
import { COLOR_PALETTE, COMMON_COLOR, EXTEND_CONFIG, KEYFRAMES } from "./src/lib/constants/css";

const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx}",
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			...EXTEND_CONFIG,
			colors: { ...COLOR_PALETTE, ...COMMON_COLOR },
			keyframes: { ...KEYFRAMES },
			fontSize: {
				sm: ["0.75rem", { lineHeight: "1.5" }],
				base: ["0.875rem", { lineHeight: "1.5715" }],
				lg: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
				xl: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
				"2xl": ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
				"3xl": ["1.5rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
				"4xl": ["1.88rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
				"5xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
				"6xl": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
				"7xl": ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		// add custom variant for expanding sidebar
		plugin(
			({
				addVariant,
				e,
			}: {
				addVariant: (name: string, callback: (args: any) => void) => void;
				e: (className: string) => string;
			}) => {
				addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
					modifySelectors(
						({ className }: { className: string }) =>
							".sidebar-expanded ." + e("sidebar-expanded" + separator + className)
					);
				});
			}
		),
	],
} satisfies Config;
