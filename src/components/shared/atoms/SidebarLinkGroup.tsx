"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";

export interface SidebarLinkGroupProps {
	open: boolean;
	className?: string;
	style?: React.CSSProperties;
	children: (handleClick: () => void, openGroup: boolean) => React.ReactNode;
}

/**
 * Sidebar Link Group Component
 * @props SidebarLinkGroupProps
 */
const SidebarLinkGroup = ({ open, className, style, children }: SidebarLinkGroupProps) => {
	const [openGroup, setOpenGroup] = useState<boolean>(open);

	/**
	 * Handle group click
	 */
	const handleGroupClick = useCallback(() => {
		setOpenGroup(!openGroup);
	}, [openGroup, setOpenGroup]);

	return (
		<li
			style={style}
			className={clsx(
				className,
				"pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] group is-link-group",
				{
					"from-primary-500/[0.12] dark:from-primary-500/[0.24] to-primary-500/[0.04]": open,
				}
			)}
		>
			{children(handleGroupClick, openGroup)}
		</li>
	);
};

export default SidebarLinkGroup;
