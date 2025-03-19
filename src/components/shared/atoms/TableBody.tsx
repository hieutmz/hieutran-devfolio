"use client";

import { ColumnType, TableColumn } from "@type/component/table.type";
import { parseToFormat } from "@utils/date-time";
import { EllipsisVertical, Menu } from "lucide-react";
import React, { Fragment, useCallback, useMemo } from "react";
import { TableRow } from "../organisms/DataTable";

export interface TableBodyProps<T> {
	id: string;
	data: T[];
	columns: TableColumn<T>[];
	showIndex?: boolean;
	showAction?: boolean;
	showCheckbox?: boolean;
	dragDropAble?: boolean;
	selectedAll?: boolean;
	selectedList?: string[];
	notSelectedList?: string[];
	showActionColumn?: boolean;

	pageSize: number;
	currentPage: number;
	onSelectRow: (row: T) => void;
}

/**
 * Table Body Component
 * @props TableBodyProps<T>
 */
const TableBody = <T extends TableRow>({
	id,
	data,
	columns,
	pageSize,
	currentPage,
	selectedList,
	notSelectedList,
	showIndex = true,
	showAction = true,
	dragDropAble = true,
	showCheckbox = true,
	selectedAll = false,
	showActionColumn = false,
	onSelectRow,
}: TableBodyProps<T>) => {
	const renderCellValue = useMemo(
		() => (col: TableColumn<T>, row: T) => {
			const value = row[col.key];

			switch (col.dataType) {
				case ColumnType.TEXT:
					return value || "-";
				case ColumnType.NUMBER:
					return value || 0;
				case ColumnType.DATE:
					return parseToFormat(value, "dd/MM/yyyy");
				case ColumnType.DATETIME:
					return parseToFormat(value, "dd/MM/yyyy HH:mm:ss");
				case ColumnType.TIME:
					return parseToFormat(value, "HH:mm:ss");
				case ColumnType.CURRENCY:
					return value.toLocaleString();
				case ColumnType.ACTION:
					return col.component?.length
						? col.component.map((action, index) => {
								const actionProps =
									typeof action.props === "function" ? action.props(row) : action.props;
								return React.createElement(action.component, {
									...(typeof actionProps === "object" ? actionProps : {}),
									key: `table-${id}-${action.component}-col-${col.key}-action-${index}`,
								});
							})
						: null;
				default:
					return null;
			}
		},
		[data, columns]
	);

	const checkSelected = useMemo(
		() => (row: T) => {
			return (
				(selectedAll && !notSelectedList?.includes(row.id)) ||
				(!selectedAll && selectedList?.includes(row.id))
			);
		},
		[selectedAll, notSelectedList, selectedList]
	);

	/**
	 * Handle row selected
	 */
	const handleSelectedRow = useCallback(
		(data: T) => () => {
			onSelectRow && onSelectRow(data);
		},
		[onSelectRow]
	);
	return (
		<tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
			{data?.map((row, rowIndex) => (
				<tr key={`table-${id}row-${rowIndex}`}>
					{/* Area: Drag Drop Row Cell */}
					{dragDropAble && (
						<td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
							<span className="sr-only">Drag Drop</span>
							<Menu size={16} className="cursor-move" />
						</td>
					)}

					{/* Area: Checkbox Cell */}
					{showCheckbox && (
						<td className="px-2 py-2 whitespace-nowrap w-px">
							<div className="flex items-center">
								<label className="inline-flex">
									<span className="sr-only">Select all</span>
									<input
										className="form-checkbox"
										type="checkbox"
										checked={!!checkSelected(row)}
										onChange={handleSelectedRow(row)}
									/>
								</label>
							</div>
						</td>
					)}

					{/* Area: Index Row Cell */}
					{showIndex && (
						<td align="center" className="px-2 py-2 whitespace-nowrap w-px">
							<div className="flex items-center justify-center">
								{(currentPage - 1) * pageSize + rowIndex + 1}
							</div>
						</td>
					)}

					{columns.map((col, colIndex) => (
						<Fragment key={`table-${id}-row-${colIndex}-col-${col.key}`}>
							<td key={col.key} className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
								<div className="flex items-center">
									<div className="font-medium text-gray-800 dark:text-gray-100">
										{renderCellValue(col, row)}
									</div>
								</div>
							</td>
						</Fragment>
					))}

					{showActionColumn && (
						<td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
							{/* Menu button */}
							<button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full">
								<span className="sr-only">Menu</span>
								<EllipsisVertical strokeWidth={2.5} />
							</button>
						</td>
					)}
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;
