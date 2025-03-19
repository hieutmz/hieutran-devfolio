"use client";

import { Position } from "@/src/lib/type/common.type";
import { Transition } from "@headlessui/react";
import { MouseEvent, useCallback, useState } from "react";

export interface TooltipProps {
	children: React.ReactNode;
	className?: string;
	content?: string | React.ReactNode;
	bg?: "dark" | "light" | null;
	size?: "sm" | "md" | "lg" | "full" | "none" ;
	position?: Position;
	icon?: string;
}

/**
 * Tooltip component
 * @param props TooltipProps
 * @returns JSX.Element
 */
const Tooltip = ({
	children,
	className = "",
	bg = "light",
	size = "none",
	position = "top",
	icon = "",
	content,
}: TooltipProps) => {
	const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
	const positionOuterClasses = useCallback((position: TooltipProps["position"]) => {
		switch (position) {
			case "right":
				return "left-full top-1/2 -translate-y-1/2";
			case "left":
				return "right-full top-1/2 -translate-y-1/2";
			case "bottom":
				return "top-full left-1/2 -translate-x-1/2";
			default:
				return "bottom-full left-1/2 -translate-x-1/2";
		}
	}, []);

	/**
	 * Initialize size classes
	 * @param size TooltipProps["size"]
	 */
	const sizeClasses = useCallback((size: TooltipProps["size"]) => {
		switch (size) {
			case "lg":
				return "min-w-[18rem] px-3 py-2";
			case "md":
				return "min-w-[14rem] px-3 py-2";
			case "sm":
				return "min-w-[11rem] px-3 py-2";
			case "full":
				return "min-w-full px-3 py-2 whitespace-nowrap";
			default:
				return "px-3 py-2";
		}
	}, []);

	/**
	 * Initialize color classes
	 * @param bg TooltipProps["bg"]
	 */
	const colorClasses = useCallback((bg: TooltipProps["bg"]) => {
		switch (bg) {
			case "light":
				return "bg-white text-gray-600 border-gray-200";
			case "dark":
				return "bg-gray-800 text-gray-100 border-gray-700/60";
			default:
				return "text-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700/60";
		}
	}, []);

	/**
	 * Initialize position classes
	 * @param position TooltipProps["position"]
	 */
	const positionInnerClasses = useCallback((position: TooltipProps["position"]) => {
		switch (position) {
			case "right":
				return "ml-2";
			case "left":
				return "mr-2";
			case "bottom":
				return "mt-2";
			default:
				return "mb-2";
		}
	}, []);

	/**
	 * Open tooltip
	 */
	const toggleTooltip = useCallback(() => {
		setTooltipOpen(true);
	}, []);

	/**
	 * Close tooltip
	 */
	const closeTooltip = useCallback(() => {
		setTooltipOpen(false);
	}, []);

	/**
	 * Prevent click
	 * @param event React.MouseEvent
	 */
	const preventClick = useCallback((event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
	}, []);

	return (
		<button
			type="button"
			className={`relative ${className}`}
			onMouseEnter={toggleTooltip}
			onMouseLeave={closeTooltip}
			onFocus={toggleTooltip}
			onBlur={closeTooltip}
			onClick={preventClick}
		>
			{children}

			<div className={`z-10 absolute ${positionOuterClasses(position)}`}>
				<Transition
					show={tooltipOpen}
					as="div"
					className={`rounded-lg border overflow-hidden shadow-lg ${sizeClasses(
						size
					)} ${colorClasses(bg)} ${positionInnerClasses(position)}`}
					enter="transition ease-out duration-200 transform"
					enterFrom="opacity-0 -translate-y-2"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-out duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					unmount={false}
				>
					{content}
				</Transition>
			</div>
		</button>
	);
};

export default Tooltip;
