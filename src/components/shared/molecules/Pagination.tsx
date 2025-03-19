"use client";

import { useCallback } from "react";
import PageSizeDropdown from "../atoms/PageSizeDropdown";
import PaginationNumeric from "../atoms/PaginationNumeric";

export interface PaginationProps {
	totalItems?: number;
	pageSize?: number;
	currentPage?: number;
	setPage: (page: number) => void;
	setPageSize: (value: number) => void;
}

/**
 * Pagination Component
 * @props PaginationProps
 */
const Pagination = ({
	totalItems = 0,
	pageSize = 50,
	currentPage = 1,
	setPage,
	setPageSize,
}: PaginationProps) => {
	/**
	 * Handle set page
	 * @param page number
	 */
	const handleSetPage = useCallback(
		(page: number) => {
			setPage && setPage(page);
		},
		[setPage]
	);

	/**
	 * Handle set page size
	 * @param vale number
	 */
	const handleSetPageSize = useCallback(
		(value: number) => {
			setPageSize && setPageSize(value);
		},
		[setPageSize]
	);

	return (
		<div className="flex justify-between items-center">
			<div className="text-sm text-gray-500 text-center sm:text-left">
				<span className="font-medium text-gray-600 dark:text-gray-300">
					{totalItems > 0 ? pageSize * (currentPage - 1) + 1 : 0}
				</span>{" "}
				-{" "}
				<span className="font-medium text-gray-600 dark:text-gray-300">
					{pageSize * currentPage || 0}
				</span>{" "}
				of <span className="font-medium text-gray-600 dark:text-gray-300">{totalItems}</span>{" "}
				results
			</div>
			<div className="flex gap-3">
				{/* Area: Page size */}
				<PageSizeDropdown pagesize={pageSize} onSetPageSize={handleSetPageSize} />

				{/* Area: Pagination */}
				<PaginationNumeric
					pageSize={pageSize}
					totalItems={totalItems}
					currentPage={currentPage}
					setPage={handleSetPage}
				/>
			</div>
		</div>
	);
};

export default Pagination;
