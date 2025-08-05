import React from "react";
import { IconButton } from "@mui/material";

interface Props {
	onClick: () => void;
	icon: React.ReactNode;
	color?: string;
	hoverColor?: string;
	hoverBg?: string;
}

const ButtonActionIcon: React.FC<Props> = ({
	onClick,
	icon,
	color = "#64748b",
	hoverColor = "#3b82f6",
	hoverBg = "rgba(59, 130, 246, 0.08)",
	}) => {
	return (
		<IconButton
		size="small"
		onClick={onClick}
		sx={{
			color,
			backgroundColor: "rgba(0, 0, 0, 0.02)",
			"&:hover": {
			color: hoverColor,
			backgroundColor: hoverBg,
			transform: "scale(1.05)",
			},
			transition: "all 0.2s ease",
		}}
		>
		{icon}
		</IconButton>
	);
};

export default ButtonActionIcon;
