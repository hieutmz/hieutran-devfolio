"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { SelectOption } from "@type/common.type";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useCallback } from "react";

const PAGE_SIZE_OPTIONS: SelectOption[] = [
	{
		value: 5,
		label: "5",
	},
	{
		value: 10,
		label: "10",
	},
	{
		value: 20,
		label: "20",
	},
	{
		value: 50,
		label: "50",
	},
	{
		value: 100,
		label: "100",
	},
];

export interface PageSizeDropdownProps {
	pagesize?: number;
	onSetPageSize: (value: number) => void;
}

/**
 * Page Size Dropdown Component
 * @props PageSizeDropdownProps
 * @returns
 */
const PageSizeDropdown = ({ pagesize = 50, onSetPageSize }: PageSizeDropdownProps) => {
	/**
	 * Handle set page size
	 * @param value number
	 */
	const handleSetPageSize = useCallback(
		(value: number) => () => {
			onSetPageSize(Number(value));
		},
		[onSetPageSize]
	);

	return (
		<Menu as="div" className="relative inline-flex">
			{({ open }) => (
				<>
					{/* Area: Page Size Dropdown Button */}
					<MenuButton
						className="btn justify-between min-w-[5.5rem] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
						aria-label="Select date range"
					>
						<span className="flex items-center">
							<svg
								className="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-2"
								width="16"
								height="16"
								viewBox="0 0 16 16"
							>
								<path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
								<path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
							</svg>
							<span>{pagesize}</span>
						</span>

						{/* Area: Caret */}
						<ChevronDown
							size={16}
							strokeWidth={3}
							className={clsx("shrink-0 ml-1 text-gray-400 dark:text-gray-500 transition-all", {
								"rotate-180": open,
							})}
						/>
					</MenuButton>

					{/* Area: Dropdown */}

					<MenuItems
						transition
						anchor="bottom start"
						className="font-medium text-sm text-gray-600 dark:text-gray-300 focus:outline-none w-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
					>
						{PAGE_SIZE_OPTIONS.map((option) => (
							<MenuItem key={`page-size-${option.label}`}>
								{({ focus }) => (
									<button
										className={`flex items-center w-full py-1 px-3 cursor-pointer ${focus ? "bg-gray-50 dark:bg-gray-700/20" : ""} ${option.value === pagesize && "text-primary-500"}`}
										onClick={handleSetPageSize(Number(option.value))}
									>
										<Check
											size={12}
											strokeWidth={4}
											className={clsx("text-primary-500", {
												invisible: option.value !== pagesize,
											})}
										/>
										<span>{option.label}</span>
									</button>
								)}
							</MenuItem>
						))}
					</MenuItems>
				</>
			)}
		</Menu>
	);
};

export default PageSizeDropdown;
