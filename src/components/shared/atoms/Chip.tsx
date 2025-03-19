"use client";

import { Size } from "@/src/lib/type/common.type";
import clsx from "clsx";
import React from "react";

type ChipType = "default" | "soft";
type ChipVariant = "primary" | "secondary" | "success" | "info" | "warning" | "danger";
export interface ChipProps {
	children?: React.ReactNode;
	variant?: ChipVariant;
	type?: ChipType;
	size?: Size;
	className?: string;
}

const Chip = ({
	children,
	className,
	size = "md",
	type = "soft",
	variant = "primary",
}: ChipProps) => {
	return (
		<div
			className={clsx(className, "text-sm px-2.5 py-1 rounded-full shadow-none flex items-center", {
				"bg-primary-500/20 text-primary-600": variant === "primary" && type === "soft",
				"bg-secondary-500/20 text-secondary-600": variant === "secondary" && type === "soft",
				"bg-info-500/20 text-info-600": variant === "info" && type === "soft",
				"bg-success-500/20 text-success-600": variant === "success" && type === "soft",
				"bg-warning-500/20 text-warning-600": variant === "warning" && type === "soft",
				"bg-danger-500/20 text-danger-600": variant === "danger" && type === "soft",

				// Variant default
				"bg-primary-500 text-white": variant === "primary" && type === "default",
				"bg-secondary-500 text-white": variant === "secondary" && type === "default",
				"bg-info-500 text-white": variant === "info" && type === "default",
				"bg-success-500 text-white": variant === "success" && type === "default",
				"bg-warning-500 text-white": variant === "warning" && type === "default",
				"bg-danger-500 text-white": variant === "danger" && type === "default",

				// Size
				"h-[16px] text-sm": size === "2xs",
				"h-[18px] text-sm": size === "xs",
				"h-5": size === "sm",
				"h-6": size === "md",
				"h-7 text-base": size === "lg",
				"h-8 text-lg": size === "xl",
				"h-9 text-xl": size === "2xl",
			})}
		>
			{/* Area: Children */}
			{children}
		</div>
	);
};

export default Chip;
