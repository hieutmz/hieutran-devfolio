"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarLinkProps {
	href: string;
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

/**
 * Sidebar Link Component
 * @props SidebarLinkProps
 */
const SidebarLink = ({ children, href, className, style }: SidebarLinkProps) => {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			style={style}
			className={clsx(
				className,
				"block text-gray-800 animate-[sidebar-animation_ease-in-out] relative dark:text-gray-100 transition truncate",
				{
					"group-[.is-link-group]:text-primary-500": pathname === href,
					"hover:text-gray-900 dark:hover:text-white group-[.is-link-group]:text-gray-500/90 dark:group-[.is-link-group]:text-gray-400 group-[.is-link-group]:hover:text-gray-700 dark:group-[.is-link-group]:hover:text-gray-200":
						pathname !== href,
				}
			)}
		>
			{/* Area: Content */}
			{children}
		</Link>
	);
};

export default SidebarLink;
