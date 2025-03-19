"use client";

import React from "react";

export interface HeaderTitleProps {
	title: string;
	children?: React.ReactNode;
}

/**
 * Header Title
 * @props HeaderTitleProps
 */
const HeaderTitle = ({ title, children }: HeaderTitleProps) => {
	return (
		<div className="flex gap-2 items-center">
			<h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">{title}</h1>
			{children}
		</div>
	);
};

export default HeaderTitle;
