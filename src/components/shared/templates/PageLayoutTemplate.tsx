"use client";

import React, { ReactNode } from "react";
import Breadcrumb, { BreadcrumbItem } from "../atoms/Breadcrumb";

export interface PageLayoutProps {
	headerTitle: string;
	headerChildren: ReactNode;
	children: ReactNode;
	breadcrumbs: BreadcrumbItem[];
}

/**
 * Page Layout Component
 * @props PageLayoutProps
 */
const PageLayoutTemplate = ({
	children,
	headerTitle,
	headerChildren,
	breadcrumbs,
}: PageLayoutProps) => {
	return (
		<>
			{/* Area: Header Title */}
			<div className="sm:flex sm:justify-between sm:items-center mb-8">
				{/* Left: Title */}
				<div className="mb-4 sm:mb-0">
					<h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
						{headerTitle}
					</h1>
					{headerChildren}
				</div>
				{/* Right: Header */}
				<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
					<Breadcrumb separate="ChevronRight" breadcrumbs={breadcrumbs} />
				</div>
			</div>

			{children}
		</>
	);
};

export default PageLayoutTemplate;
