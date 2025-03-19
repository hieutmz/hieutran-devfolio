"use client";

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { CheckCircle2, CircleX } from "lucide-react";
import { useCallback, useMemo } from "react";

type ConfirmModalState = "success" | "info" | "warning" | "error";

export interface ConfirmModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	title?: string;
	state?: ConfirmModalState;
	confirmLabel?: string;
	cancelLabel?: string;
	setIsOpen: (value: boolean) => void;
	onConfirm?: () => void;
	onCancel?: () => void;
}

/**
 * Confirm Modal Component
 * @props ConfirmModalProps
 */
const ConfirmModal = ({
	children,
	isOpen,
	title,
	confirmLabel,
	cancelLabel,
	state = "warning",
	setIsOpen,
	onConfirm,
	onCancel,
}: ConfirmModalProps) => {
	const typeIcon = useMemo(() => {
		switch (state) {
			case "warning":
				return (
					<svg
						className="shrink-0 fill-current opacity-80 text-warning-500"
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
						className="shrink-0 fill-current opacity-80 text-danger-500"
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
						className="shrink-0 fill-current opacity-80 text-success-500"
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
						className="shrink-0 fill-current opacity-80 text-info-500"
						width="16"
						height="16"
						viewBox="0 0 16 16"
					>
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
					</svg>
				);
		}
	}, [state]);

	/**
	 * Handle cancel
	 */
	const handleCancel = useCallback(() => {
		onCancel && onCancel();
		setIsOpen(false);
	}, [onCancel, setIsOpen]);

	/**
	 * Handle cancel
	 */
	const handleConfirm = useCallback(() => {
		onConfirm && onConfirm();
		setIsOpen(false);
	}, [onConfirm, setIsOpen]);

	return (
		<Transition appear show={isOpen}>
			<Dialog as="div" onClose={() => setIsOpen(false)}>
				<TransitionChild
					as="div"
					className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
					enter="transition ease-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition ease-out duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					aria-hidden="true"
				/>
				<TransitionChild
					as="div"
					className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
					enter="transition ease-in-out duration-200"
					enterFrom="opacity-0 translate-y-4"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-in-out duration-200"
					leaveFrom="opacity-100 translate-y-0"
					leaveTo="opacity-0 translate-y-4"
				>
					<DialogPanel className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto max-w-lg w-full max-h-full">
						<div className="p-5 flex space-x-4">
							{/* Icon */}
							<div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 dark:bg-gray-700">
								{typeIcon}
							</div>
							{/* Content */}
							<div>
								{/* Area: Modal header */}
								<div className="mb-2">
									<div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
										{title}
									</div>
								</div>

								{/* Area: Modal content */}
								{children}

								{/* Area: Modal footer */}
								<div className="flex flex-wrap justify-end space-x-2">
									<button
										className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
										onClick={handleCancel}
									>
										<CircleX size={16} className="mr-1" />
										{cancelLabel}
									</button>
									<button
										className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
										onClick={handleConfirm}
									>
										<CheckCircle2 size={16} className="mr-1" />
										{confirmLabel}
									</button>
								</div>
							</div>
						</div>
					</DialogPanel>
				</TransitionChild>
			</Dialog>
		</Transition>
	);
};

export default ConfirmModal;
