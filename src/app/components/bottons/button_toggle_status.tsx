import React from "react";
import { IconButton } from "@mui/material";
import { ToggleLeft, ToggleRight } from "lucide-react";

interface ButtonToggleStatusProps {
	isActive?: boolean;
	onToggle: () => void;
}

const ButtonToggleStatus: React.FC<ButtonToggleStatusProps> = ({
	isActive,
	onToggle,
	}) => {
	return (
		<IconButton
		size="small"
		onClick={onToggle}
		sx={{
			color: isActive ? "#10b981" : "#64748b",
			backgroundColor: isActive
			? "rgba(16, 185, 129, 0.08)"
			: "rgba(0, 0, 0, 0.02)",
			"&:hover": {
			backgroundColor: isActive
				? "rgba(16, 185, 129, 0.15)"
				: "rgba(59, 130, 246, 0.08)",
			transform: "scale(1.05)",
			},
			transition: "all 0.2s ease",
		}}
		>
		{isActive ? (
			<ToggleRight size={24} color="#4ade80" />
		) : (
			<ToggleLeft size={24} color="#94a3b8" />
		)}
		</IconButton>
	);
};

export default ButtonToggleStatus;
