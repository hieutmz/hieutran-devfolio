"use client";

import * as LucideIcons from "lucide-react";
import { LucideIcon as LucideIconComponent } from "lucide-react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
	name: keyof typeof LucideIcons;
	color?: string;
	size?: number;
	className?: string;
}

/**
 * Icon Component
 * @props IconProps
 * @returns JSX.Element
 */
const Icon = ({ name, color = "currentColor", className, size = 20, ...props }: IconProps) => {
	const LucideIcon = LucideIcons[name] as LucideIconComponent;
	if (!LucideIcon) {
		return null;
	}

	return <LucideIcon {...props} size={size} color={color} className={className} />;
};

export default Icon;
