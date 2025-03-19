"use client";

import Icon from "./Icon";

type BreadcrumbSeparate = "ChevronRight" | "Slash" | "Dot";

export interface BreadcrumbItem {
	key: string;
	label: string;
	url?: string;
}
export interface BreadcrumbProps {
	breadcrumbs: BreadcrumbItem[];
	separate: BreadcrumbSeparate;
}

/**
 * Breadcrumb component
 * @props BreadcrumbProps
 */
const Breadcrumb = ({ breadcrumbs, separate }: BreadcrumbProps) => {
	return (
		<ul className="inline-flex flex-wrap text-sm font-medium gap-1">
			{breadcrumbs.map((item, index) => {
				return (
					<li key={`${item.key}-${index}`} className="flex items-center gap-1">
						<a
							className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-500"
							href={item.url}
						>
							{item.label}
						</a>

						{/* Area: Separate icon */}
						{index < breadcrumbs.length - 1 && (
							<Icon name={separate} size={12} className="text-gray-500" />
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default Breadcrumb;
