"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type BannerType = "warning" | "error" | "success" | "info" | "";
export interface BannerProps {
	children: React.ReactNode;
	className?: string;
	type?: BannerType;
	soft?: boolean;
}

/**
 * Banner Component
 * @props BannerProps
 */
const Banner = ({ soft, children, className = "", type = "" }: BannerProps) => {
	const [open, setOpen] = useState<boolean>(true);

	const typeIcon = useMemo(() => {
		switch (type) {
			case "warning":
				return (
					<svg
						className="shrink-0 fill-current opacity-80"
						width="16"
						height="16"
						viewBox="0 0 16 16"
					>
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
					</svg>
				);
			case "error":
				return (
					<svg
						className="shrink-0 fill-current opacity-80"
						width="16"
						height="16"
						viewBox="0 0 16 16"
					>
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />
					</svg>
				);
			case "success":
				return (
					<svg
						className="shrink-0 fill-current opacity-80"
						width="16"
						height="16"
						viewBox="0 0 16 16"
					>
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
					</svg>
				);
			default:
				return (
					<svg
						className="shrink-0 fill-current opacity-80"
						width="16"
						height="16"
						viewBox="0 0 16 16"
					>
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
					</svg>
				);
		}
	}, [type]);

	/**
	 * Handle close banner
	 */
	const handleCloseBanner = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return (
		<>
			{open && (
				<div className={className} role="alert">
					<div
						className={clsx("px-4 py-2 rounded-lg text-sm flex items-center text-white", {
							"bg-warning-500": type === "warning" && !soft,
							"bg-danger-500": type === "error" && !soft,
							"bg-info-500": type === "info" && !soft,
							"bg-success-500": type === "success" && !soft,

							// Soft
							"bg-warning-100": type === "warning" && soft,
							"bg-danger-100": type === "error" && soft,
							"bg-info-100": type === "info" && soft,
							"bg-success-100": type === "success" && soft,
						})}
					>
						<div className="flex w-full justify-between items-center ">
							<div className="flex items-center gap-4">
								<div
									className={clsx({
										"text-warning-500": type === "warning" && soft,
										"text-danger-500": type === "error" && soft,
										"text-info-500": type === "info" && soft,
										"text-success-500": type === "success" && soft,
									})}
								>
									{typeIcon}
								</div>
								<div className={clsx("font-medium", { "text-primary-text-color": soft })}>
									{children}
								</div>
							</div>
							<button className="opacity-60 hover:opacity-70 ml-3" onClick={handleCloseBanner}>
								<div className="sr-only">Close</div>
								<X size={20} className={clsx({ "text-primary-text-color": soft })} />
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Banner;