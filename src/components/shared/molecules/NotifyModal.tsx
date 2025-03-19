"use client";

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { X } from "lucide-react";
import { useCallback } from "react";

export interface NotifyModalProps {
	children: React.ReactNode;
	title: string;
	isOpen: boolean;
	confirmLabel?: string;
	cancelLabel?: string;
	setIsOpen: (value: boolean) => void;
	onConfirm?: () => void;
}

/**
 * Notify Modal Component
 * @props NotifyModalProps
 */
const NotifyModal = ({
	children,
	title,
	isOpen,
	confirmLabel,
	cancelLabel,
	setIsOpen,
	onConfirm,
}: NotifyModalProps) => {
	/**
	 * Handle outside modal click
	 */
	const handleOutsideClick = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	/**
	 * Handle close modal
	 */
	const handleCloseModal = useCallback(
		(event: React.MouseEvent) => {
			event.stopPropagation();
			setIsOpen(false);
		},
		[setIsOpen]
	);

	return (
		<Transition appear show={isOpen}>
			<Dialog as="div" onClose={handleOutsideClick}>
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
						{/* Area: Modal header */}
						<div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700/60">
							<div className="flex justify-between items-center">
								<DialogTitle className="font-semibold text-gray-800 dark:text-gray-100">
									{title}
								</DialogTitle>
								<button
									className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
									onClick={handleCloseModal}
								>
									<div className="sr-only">Close</div>
									<X size={20} />
								</button>
							</div>
						</div>

						{/* Area: Modal Content */}
						{children}

						{/* Area: Modal footer */}
						<div className="px-5 py-4">
							<div className="flex flex-wrap justify-end space-x-2">
								<button
									className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
									onClick={handleCloseModal}
								>
									{cancelLabel}
								</button>
								<button
									className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
									onClick={onConfirm}
								>
									{confirmLabel}
								</button>
							</div>
						</div>
					</DialogPanel>
				</TransitionChild>
			</Dialog>
		</Transition>
	);
};
export default NotifyModal;
