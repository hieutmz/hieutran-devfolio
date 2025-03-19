"use client";

import { Size, Variant } from "@/src/lib/type/common.type";
import clsx from "clsx";
import { Loader } from "lucide-react";
import { MouseEvent, useMemo } from "react";

type ButtonStates = "loading" | "disabled" | "default";
type ButtonRounded = Omit<Size, "2xs" | "xs">;

export interface ButtonProps {
	size?: Size;
	variant?: Variant;
	outline?: boolean;
	className?: string;
	state?: ButtonStates;
	rounded?: ButtonRounded;
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button config classnames
 * @param size Size
 * @param outline boolean
 * @param variant Variant
 * @param className string
 * @param state ButtonStates
 * @param rounded ButtonRounded
 * @returns string
 */
const getButtonClassNames = (
	className: string,
	state: ButtonStates,
	outline: boolean,
	variant: Variant,
	rounded: ButtonRounded,
	size: Size
) => {
	return clsx(
		className,
		"min-w-20 btn py-0 px-3 hover:brightness-105 active:scale-x-95 active:scale-y-95 active:brightness-90",
		{
			// State
			"!bg-disabled-color pointer-events-none": state === "disabled" && !outline,
			"!bg-white !text-disabled-color border !border-disabled-color pointer-events-none":
				state === "disabled" && outline,
			"pointer-events-none": state === "loading",

			// Variant
			"bg-primary-500 text-white": variant === "primary" && !outline,
			"bg-secondary-500 text-white": variant === "secondary" && !outline,
			"bg-success-500 text-white": variant === "success" && !outline,
			"bg-info-500 text-white": variant === "info" && !outline,
			"bg-warning-500 text-white": variant === "warning" && !outline,
			"bg-danger-500 text-white": variant === "danger" && !outline,
			"bg-surface-500 text-white": variant === "surface" && !outline,

			// Outline
			"bg-white border border-primary-500 text-primary-500": outline && variant === "primary",
			"bg-white border border-secondary-500 text-secondary-500": outline && variant === "secondary",
			"bg-white border border-success-500 text-success-500": outline && variant === "success",
			"bg-white border border-info-500 text-info-500": outline && variant === "info",
			"bg-white border border-warning-500 text-warning-500": outline && variant === "warning",
			"bg-white border border-danger-500 text-danger-500": outline && variant === "danger",

			// Rounded
			"rounded-sm": rounded === "sm",
			"rounded-md": rounded === "md",
			"rounded-lg": rounded === "lg",
			"rounded-xl": rounded === "xl",
			"rounded-2xl": rounded === "2xl",
			"rounded-full": rounded === "full",

			// Size
			"h-6 text-sm": size === "2xs",
			"h-7 text-base": size === "xs",
			"h-8 text-base": size === "sm",
			"h-9 text-base": size === "md",
			"h-10 text-lg": size === "lg",
			"h-11 text-lg": size === "xl",
			"h-12 text-2xl": size === "2xl",
		}
	);
};

/**
 * Button component
 * @param props ButtonProps
 * @returns JSX.Element
 */
const Button = ({
	children,
	size = "md",
	className = "",
	state = "default",
	outline = false,
	variant = "primary",
	type = "button",
	rounded = "md",
	onClick = () => {},
}: ButtonProps) => {
	const iconSize = useMemo(() => {
		switch (size) {
			case "2xs":
				return 14;
			case "xs":
				return 16;
			case "sm":
				return 18;
			case "md":
				return 20;
			case "lg":
				return 22;
			case "xl":
				return 24;
			case "2xl":
				return 26;
			default:
				return 20;
		}
	}, [size]);

	return (
		<button
			type={type}
			disabled={state === "disabled"}
			className={getButtonClassNames(className, state, outline, variant, rounded, size)}
			onClick={onClick}
		>
			{state === "loading" ? (
				<div className="mr-2">
					<Loader className="animate-spin shrink-0" size={iconSize} />
				</div>
			) : null}
			{children}
		</button>
	);
};

export default Button;
