"use client";

import React, { ReactNode } from "react";

type ActionButton = "confirm" | "cancel";

export interface ModalActionProps {
	children?: ReactNode;
	actionButtons?: ActionButton[];
	confirmLabel?: string;
	cancelLabel?: string;
	onCancel?: () => void;
	onConfirm?: () => void;
}

/**
 * Modal Action Component
 * @props ModalActionProps
 */
const ModalAction = ({
	children,
	confirmLabel,
	cancelLabel,
	actionButtons = ["confirm", "cancel"],
	onConfirm = () => {},
	onCancel = () => {},
}: ModalActionProps) => {
	return (
		<>
			{/* Area: Modal Action */}
			<div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60">
				<div className="flex flex-wrap justify-end space-x-2">
					{/* Area: Cancel Button */}
					{actionButtons.includes("cancel") && (
						<button
							className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
							onClick={onCancel}
						>
							{cancelLabel}
						</button>
					)}

					{/* Area: Children content */}
					{children}

					{/* Area: Confirm Button */}
					{actionButtons.includes("confirm") && (
						<button
							className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
							onClick={onConfirm}
						>
							{confirmLabel}
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default ModalAction;
