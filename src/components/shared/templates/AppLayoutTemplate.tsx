"use client";

import { useLayoutEffect, useState } from "react";

const AppLayoutTemplate = ({ children }: { children: React.ReactNode }) => {
	// Init menu sidebar
	useLayoutEffect(() => {}, []);

	return (
		<div className="flex h-[100dvh] overflow-hidden">
			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				<main className="grow [&>*:first-child]:scroll-mt-16">
					<div className="px-2 sm:px-3 lg:px-4 py-4 w-full">{children}</div>
				</main>
			</div>
		</div>
	);
};

export default AppLayoutTemplate;
