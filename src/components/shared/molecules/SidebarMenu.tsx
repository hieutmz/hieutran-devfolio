"use client";

import clsx from "clsx";
import * as LucideIcons from "lucide-react";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useCallback } from "react";
import Icon from "../atoms/Icon";
import SidebarLink from "../atoms/SidebarLink";
import SidebarLinkGroup from "../atoms/SidebarLinkGroup";

export interface GroupMenu {
	id: string;
	label: string;
	groupId: string;
	icon: keyof typeof LucideIcons;
	href?: string;
	subGroups?: Omit<GroupMenu, "icon" | "subGroups">[];
}
export interface SidebarMenuProps {
	expandOnly: boolean;
	sidebarOpen?: boolean;
	groupName?: string;
	groups: GroupMenu[];
	className?: string;
	onToggleSidebar: (value: boolean) => void;
}

/**
 * Sidebar Menu Props
 * @props SidebarMenuProps
 */
const SidebarMenu = ({
	groups,
	className,
	groupName,
	expandOnly,
	sidebarOpen,
	onToggleSidebar,
}: SidebarMenuProps) => {
	const segments = useSelectedLayoutSegments();
	const pathName = usePathname();

	const checkExistActive = useCallback(
		(subGroups: Omit<GroupMenu, "icon" | "subGroups">[]) => {
			return subGroups.some((item) => {
				return segments.some((segment) => item.href?.split("/").includes(segment));
			});
		},
		[segments]
	);

	return (
		<div className={className}>
			<h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
				<span
					className={clsx(
						"hidden lg:sidebar-expanded:hidden 2xl:hidden text-center w-6 group-name-icon",
						{
							"!block": !sidebarOpen,
						}
					)}
					aria-hidden="true"
				>
					•••
				</span>
				<span
					className={clsx("lg:sidebar-expanded:block 2xl:block group-name-header", {
						"!hidden": !sidebarOpen,
					})}
				>
					{groupName?.toUpperCase()}
				</span>
			</h3>
			<ul className="mt-3">
				{groups.map((item, index) => {
					if (item.subGroups?.length) {
						return (
							<SidebarLinkGroup
								key={item.id}
								open={checkExistActive(item.subGroups)}
								className="animate-[sidebar-animation_ease-in-out] relative"
								style={{ animationDuration: `${0.1 * (index + 1)}s` }}
							>
								{(handleClick, open) => {
									return (
										<>
											<a
												href="#0"
												className={clsx(
													"block text-gray-800 dark:text-gray-100 truncate transition",
													{
														"hover:text-gray-900 dark:hover:text-white": !segments.includes(
															item.href ?? "#"
														),
													}
												)}
												onClick={(e) => {
													e.preventDefault();
													expandOnly ? onToggleSidebar(true) : handleClick();
												}}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<Icon
															size={16}
															name={item.icon}
															strokeWidth={2.5}
															className={clsx("text-secondary-text-color", {
																"text-primary-500": segments.includes(`${item.href ?? "#"}`),
															})}
														/>
														<span
															className={clsx(
																"text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 menu-title",
																{
																	"!hidden": !sidebarOpen,
																}
															)}
														>
															{item.label}
														</span>
													</div>

													{/* Icon */}
													<div className="flex shrink-0 ml-2">
														<LucideIcons.ChevronDown
															size={12}
															className={clsx("transition-all menu-chevron-down-icon", {
																"rotate-180": open,
																"!hidden": !sidebarOpen,
															})}
														/>
													</div>
												</div>
											</a>
											<div
												className={clsx("lg:sidebar-expanded:block 2xl:block sub-menu-content", {
													"!hidden": !sidebarOpen,
												})}
											>
												<ul className={clsx("pl-8 mt-1", { hidden: !open })}>
													{item.subGroups?.map((sub, order) => {
														return (
															<li key={sub.id} className="mb-1 last:mb-0">
																<SidebarLink
																	href={sub.href ?? "#"}
																	style={{ animationDuration: `${0.1 * (order + 1)}s` }}
																>
																	<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																		{sub.label}
																	</span>
																</SidebarLink>
															</li>
														);
													})}
												</ul>
											</div>
										</>
									);
								}}
							</SidebarLinkGroup>
						);
					}
					return (
						<li
							key={item.id}
							className={clsx(
								"pl-4 pr-3 py-2 animate-[sidebar-animation_ease-in-out] relative rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))]",
								{
									"from-primary-500/[0.12] dark:from-primary-500/[0.24] to-primary-500/[0.04]":
										pathName === item.href,
								}
							)}
							style={{ animationDuration: `${0.1 * (index + 1)}s` }}
						>
							<SidebarLink href={item.href ?? "#"}>
								<div className="flex items-center justify-between">
									<div className="grow flex items-center">
										<Icon
											size={16}
											strokeWidth={2.5}
											name={item.icon}
											className={clsx("text-secondary-text-color", {
												"text-primary-500": pathName === item.href,
											})}
										/>
										<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
											{item.label}
										</span>
									</div>
								</div>
							</SidebarLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SidebarMenu;
