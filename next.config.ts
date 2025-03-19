import path from "path";
import createNextIntlPlugin from "next-intl/plugin";
import { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts"); // Pass only the path as a string

const nextConfig: NextConfig = {
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"@type": path.resolve("./src/lib/type"),
			"@api": path.resolve("./src/lib/api"),
			"@constants": path.resolve("./src/lib/constants"),
			"@context": path.resolve("./src/lib/context"),
			"@css": path.resolve("./src/lib/css"),
			"@hooks": path.resolve("./src/lib/hooks"),
			"@utils": path.resolve("./src/lib/utils"),
			"@components": path.resolve("./src/components"),
		};
		return config;
	},
	output: "standalone",
};

// Wrap the Next.js config with next-intl
export default withNextIntl(nextConfig);
