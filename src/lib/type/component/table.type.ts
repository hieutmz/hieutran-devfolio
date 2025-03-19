import { SelectOption } from "@type/common.type";
import { ComponentClass, FunctionComponent } from "react";

export interface TableColumn<T> {
	key: string;
	label: string;
	dataType: ColumnType;
	headerClass?: string;
	placement?: "center" | "left" | "right" | "justify" | "char" | null;
	isHidden?: boolean;
	class?: string;
	cellClass?: string;
	component?: TableColumnAction<T>[];
	dataFormat?: (row: T) => string;
}

export interface TableColumnAction<T> {
	component:
		| string
		| FunctionComponent<Record<string, unknown>>
		| ComponentClass<Record<string, unknown>, any>;
	props: (row: T) => unknown;
}

export interface FilterColumn {
	enable: boolean;
	icon?: string;
	name: string;
	type: FilterType;
	options?: SelectOption[];
	action?: (row: Record<string, unknown>) => void;
}

export type TableFilterColumn = {
	[x: string]: FilterColumn;
};

export enum ColumnType {
	TEXT = "text",
	NUMBER = "number",
	CURRENCY = "currency",
	DATE = "date",
	TIME = "time",
	DATETIME = "datetime",
	ACTION = "action",
	CUSTOM = "custom",
}

export enum FilterType {
	Select = "select",
	Text = "text",
	Number = "number",
	Range = "range",
	MultiSelect = "multi-select",
	Time = "time",
	Date = "date",
}

export enum ActionType {
	Link = "link",
	Function = "function",
}

export type TableConfig = {
	totalItems: number;
	data: Record<string, unknown>[];
	currentPage: number;
	pageSize: number;
	handlePaging: (page: number) => void;
	handleSearch?: (keyword: string) => void;
};

export type TableQueryParam = {
	limit: number;
	offset: number;
};

export type SortState = "asc" | "desc" | "default";

export type TableAction =
	| "freeze-column"
	| "filter"
	| "export"
	| "import"
	| "display-column"
	| "search"
	| "setting";
