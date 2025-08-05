import React from "react";
import { Box, Typography } from "@mui/material";
import { Inbox } from "lucide-react";
import { useThemeContext } from "../../core/theme/ThemeContext";

interface EmptyStateProps {
	title?: string;
	message?: string;
	icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
	title = "Sin resultados",
	message = "No se encontraron datos para mostrar.",
	icon,
}) => {
	const { theme, themes } = useThemeContext();

	// Colores basados en el tema actual
	const backgroundColor = themes[theme].background;
	const textColor = themes[theme].text;
	const iconColor = theme === "dark" ? "#94a3b8" : "#cbd5e1";

	return (
		<Box
			sx={{
				textAlign: "center",
				py: 6,
				px: 2,
				borderRadius: 2,
				backgroundColor,
				color: textColor,
				boxShadow: theme === "dark"
					? "0 1px 3px rgba(0, 0, 0, 0.3)"
					: "0 1px 3px rgba(0, 0, 0, 0.06)",
			}}
		>
			<Box mb={2}>
				{icon ?? <Inbox size={40} strokeWidth={1.2} style={{ color: iconColor }} />}
			</Box>
			<Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: "1rem" }}>
				{title}
			</Typography>
			<Typography variant="body2" sx={{ opacity: 0.7 }}>
				{message}
			</Typography>
		</Box>
	);
};

export default EmptyState;
