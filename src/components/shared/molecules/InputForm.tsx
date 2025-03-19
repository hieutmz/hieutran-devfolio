"use client";

import { Display, Placement, Size } from "@/src/lib/type/common.type";
import clsx from "clsx";
import * as LucideIcons from "lucide-react";
import { Asterisk, Info } from "lucide-react";
import React, { useMemo } from "react";
import Icon from "../atoms/Icon";
import Tooltip from "../atoms/Tooltip";

type InputType = "text" | "password" | "email" | "number" | "tel" | "url";
type InputState = "default" | "error" | "success" | "warning" | "disabled" | "readonly";

export interface InputFormProps
	extends Omit<
		React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		"size" | "type" | "readonly" | "disabled"
	> {
	size?: Size;
	label?: string;
	type?: InputType;
	feedback?: string;
	state?: InputState;
	placement?: Display;
	errorMessage?: string;
	icon?: keyof typeof LucideIcons;
	iconDirection?: Omit<Placement, "center">;
}

/**
 * Input Form component
 * @props InputFormProps
 */
const InputForm = ({
	icon,
	value,
	className,
	label = "",
	size = "md",
	type = "text",
	feedback = "",
	required = false,
	state = "default",
	placement = "col",
	errorMessage = "",
	iconDirection = "start",

	onChange,
	...props
}: InputFormProps) => {
	const phoneNumberPattern = useMemo(() => {
		if (["tel", "number"].includes(type)) {
			return "^\\d+$";
		}
		return undefined;
	}, [type]);

	const LucideIcon = useMemo(() => {
		if (!icon) return null;
		return LucideIcons[icon];
	}, [icon]);

	return (
		<div className={clsx("flex flex-col gap-1 w-full", className)}>
			<div className={clsx("flex gap-2 items-center justify-center w-full", {})}>
				<div
					className={clsx("flex gap-2 w-full", {
						"flex-col": placement === "col",
						"flex-row items-center": placement === "row",
					})}
				>
					{/* Area: Label */}
					{label && (
						<div className="flex gap-2">
							<label className="whitespace-nowrap flex">
								{label} {required && <Asterisk size={12} className="text-danger-500" />}
							</label>
							{/* Feedback */}
							{feedback && (
								<Tooltip content={feedback} size="full" position="right">
									<Info size={16} className="text-info-500" />
								</Tooltip>
							)}
						</div>
					)}

					<div className="relative">
						{/* Icon start placement */}
						{icon && iconDirection === "start" && (
							<div className="absolute inset-0 right-auto flex items-center pointer-events-none ml-2">
								{LucideIcon ? <Icon name={icon} size={20} /> : null}
							</div>
						)}

						{/* Area: Input  */}
						<input
							{...props}
							type={type}
							autoComplete="off"
							pattern={phoneNumberPattern}
							defaultValue={value}
							readOnly={state === "readonly"}
							disabled={state === "disabled"}
							className={clsx("form-input w-full", {
								// State classes
								"border-danger-500 focus:!border-danger-500 hover:!border-danger-300 dark:border-danger-500":
									errorMessage || state === "error",
								"border-success-500 focus:!border-success-500 hover:!border-success-300 dark:border-success-500":
									state === "success",
								"border-warning-500 focus:!border-warning-500 hover:!border-warning-300 dark:border-warning-500":
									state === "warning",
								"bg-disabled-color/30 dark:!bg-disabled-color/30": state === "disabled",
								"bg-disabled-color/10 dark:!bg-disabled-color/10": state === "readonly",

								// Icon
								"pl-9": icon && iconDirection === "start",
								"pr-9": icon && iconDirection === "end",

								// Size
								"h-6 text-sm": size === "2xs",
								"h-7 text-base": size === "xs",
								"h-8 text-base": size === "sm",
								"h-9 text-base": size === "md",
								"h-10 text-base": size === "lg",
								"h-11 text-lg": size === "xl",
								"h-12 text-xl": size === "2xl",
							})}
						/>

						{/* Icon end placement */}
						{icon && iconDirection === "end" && (
							<div className="absolute inset-0 left-auto flex items-center pointer-events-none mr-3">
								{LucideIcon ? <Icon name={icon} size={20} /> : null}
							</div>
						)}
					</div>
				</div>
			</div>
			{errorMessage ? <p className="text-sm italic text-danger-500">{errorMessage}</p> : null}
		</div>
	);
};

export default InputForm;
