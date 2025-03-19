"use client";

import { TableColumn } from "@type/component/table.type";
import clsx from "clsx";
import { Menu } from "lucide-react";
import React from "react";

export interface TableHeaderProps<T> {
	id: string;
	showIndex?: boolean;
	showAction?: boolean;
	selectedAll?: boolean;
	showCheckbox?: boolean;
	dragDropAble?: boolean;
	columns: TableColumn<T>[];
	showActionColumn?: boolean;
	onSelectAllClick: () => void;
}

/**
 * Table Header Component
 */
const TableHeader = <T,>({
	id,
	columns,
	showIndex = true,
	showAction = false,
	selectedAll = false,
	showCheckbox = true,
	dragDropAble = false,
	showActionColumn = false,
	onSelectAllClick,
}: TableHeaderProps<T>) => {
	return (
		<thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 [&_th]:bg-gray-50 [&_th]:dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
			<tr className="[&>th:hover]:brightness-95">
				{/* Area: Drag Drop Header Cell  */}
				{dragDropAble && (
					<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
						<span className="sr-only">Drag Drop</span>
					</th>
				)}

				{/* Area: Checkbox Header Cell */}
				{showCheckbox && (
					<th className="px-2 py-3 whitespace-nowrap w-px">
						<div className="flex items-center">
							<label className="inline-flex">
								<span className="sr-only">Select all</span>
								<input
									id={`table-${id}-header-checkbox`}
									className="form-checkbox"
									type="checkbox"
									checked={selectedAll}
									onChange={onSelectAllClick}
								/>
							</label>
						</div>
					</th>
				)}

				{/* Area: Index Header Cell */}
				{showIndex && (
					<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
						<div className="font-semibold text-left">No.</div>
					</th>
				)}

				{/* Area: Header Cell */}
				{columns.map((column, index) => (
					<React.Fragment key={`header-cell-${column.key}-${index}`}>
						{!column.isHidden && (
							<th
								className={clsx(
									"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap group",
									column.headerClass,
									{}
								)}
							>
								<div className="flex items-center justify-between ">
									<div className="font-semibold text-left">{column.label}</div>
									{showAction && (
										<div className="ml-2 group-hover:opacity-100 opacity-0">
											<Menu size={16} />
										</div>
									)}
								</div>
							</th>
						)}
					</React.Fragment>
				))}

				{/* Area: Action column Header Cell */}
				{showActionColumn && (
					<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
						<div className="font-semibold text-left">
							<Menu size={16} className="cursor-pointer" />
						</div>
					</th>
				)}
			</tr>
		</thead>
	);
};

export default TableHeader;
