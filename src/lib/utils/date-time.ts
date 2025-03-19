import { format } from "date-fns";

/**
 * Format string to date
 * @param str string | null | Date
 * @param formatDate string
 */
export const parseToFormat = (
	str: string | Date | null = "",
	formatDate: string = "yyyy/MM/dd HH:mm:ss"
) => {
	if (str instanceof Date) return format(str, formatDate);
	if (str === null || !str) return "-";
	const date = format(new Date(str), formatDate);
	return date;
};
