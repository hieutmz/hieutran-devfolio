export enum SymbolType {
	PREVIOUS_PAGE = "PREVIOUS_PAGE",
	NEXT_PAGE = "NEXT_PAGE",
	ELLIPSIS = "ELLIPSIS",
	NUMBER = "NUMBER",
}

export interface Option {
	symbol: SymbolType;
	type: "number" | "symbol";
	value: number;
}
