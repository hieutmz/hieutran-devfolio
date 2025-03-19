import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Placement } from "@type/common.type";
import clsx from "clsx";
import { ChevronUp } from "lucide-react";
import { Fragment, HTMLProps } from "react";

export interface AccordionList {
	label: string;
	onclick?: () => void;
	subAccording?: AccordionList[];
}

export interface AccordionsProps extends HTMLProps<HTMLDivElement> {
	accordionList?: AccordionList[];
	anchorPlacement?: Placement;
	className?: string;
}

/**
 * Accordions Component
 * @props AccordionsProps
 */
const Accordions = ({ accordionList, className, anchorPlacement = "start" }: AccordionsProps) => {
	return (
		<div className={clsx("h-screen w-80", className)}>
			<div className="mx-auto w-full max-w-lg divide-y divide-red/5 rounded-xl bg-red/5">
				{accordionList?.map((item, index) => (
					<Fragment key={`${item.label.replace(" ", "-").toLowerCase()}-${index}`}>
						{item.subAccording?.length ? (
							<Disclosure as="div" className="p-2" defaultOpen={index === 0}>
								{({ open }) => (
									<>
										{/* Area: Disclosure Button */}
										<DisclosureButton
											className={clsx("group flex w-full items-center", {
												"justify-between": anchorPlacement === "end",
												"gap-4": anchorPlacement === "start",
											})}
										>
											{anchorPlacement === "start" && (
												<ChevronUp
													size={16}
													className={clsx(
														"transition-all text-gray-600 group-data-[hover]:text-gray-600/80",
														{
															"rotate-180": !open,
														}
													)}
												/>
											)}
											{/* Area: Label Disclosure Button */}
											<span className="text-sm/6 font-medium text-gray-600 group-data-[hover]:text-gray-600/80">
												{item.label}
											</span>

											{anchorPlacement === "end" && (
												<ChevronUp
													className={clsx(
														"transition-all text-gray-600 group-data-[hover]:text-gray-600/80",
														{
															"rotate-180": !open,
														}
													)}
												/>
											)}
										</DisclosureButton>

										{/* Area: Disclosure Panel */}
										<DisclosurePanel className="mt-2 text-sm/5 text-gray-600/50">
											{item.subAccording && item.subAccording.length > 1 ? (
												// Area: Sub Accordions
												<Accordions
													key={`${item.label.replace(" ", "-").toLowerCase()}-${index}`}
													accordionList={item.subAccording}
													anchorPlacement={anchorPlacement}
												/>
											) : (
												// Area: Accordions Item
												<button
													className={clsx("p-2 text-left text-gray-900", {
														"pl-10": anchorPlacement === "start",
														"pr-10": anchorPlacement === "end",
													})}
													onClick={item.onclick}
												>
													{item.subAccording?.[0]?.label}
												</button>
											)}
										</DisclosurePanel>
									</>
								)}
							</Disclosure>
						) : (
							// Area: Accordions Item
							<button
								key={`${item.label.replace(" ", "-").toLowerCase()}-${index}`}
								className={clsx("p-2 text-left text-gray-900", {
									"pl-10": anchorPlacement === "start",
									"pr-10": anchorPlacement === "end",
								})}
								onClick={item.onclick}
							>
								{item.label}
							</button>
						)}
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default Accordions;
