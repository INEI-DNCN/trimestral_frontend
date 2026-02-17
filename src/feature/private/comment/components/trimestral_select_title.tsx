import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from "@mui/material";
import { useThemeContext } from "../../../../core/theme/ThemeContext";

interface SelectSimpleProps {
	width?: string;
	item: string;
	handleChange: (event: SelectChangeEvent) => void;
	items: { id: string | number; descripcion: string }[];
	label?: string;
	disabled?: boolean;
}

export default function TrimestralSelectTitle({
	width = "100%",
	item,
	handleChange,
	items = [],
	label = "",
	disabled = false,
}: SelectSimpleProps) {
	const { theme, themes } = useThemeContext();

	const backgroundColor = themes[theme].backgroundBase; // color de fondo del ítem
	const textColor = themes[theme].text; // color del texto
	const hoverBackground = themes.colors.primary; // color de fondo al hacer hover
	const selectedBackground = themes.colors.primaryHover; // color si está seleccionado

	return (
		<FormControl sx={{ width }} size="small" variant="outlined">
			<InputLabel
				sx={{
					color: "#616161",
					"&.Mui-focused": { color: "#167595" },
				}}
			>
				{label}
			</InputLabel>
			<Select
				disabled={disabled}
				value={item}
				onChange={handleChange}
				label={label}
				sx={{
					bgcolor: "transparent",
					color: themes[theme].text,
					fontWeight: "bold",
					fontSize: '28px',
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: "transparent",
					},
					"&:hover": {
						bgcolor: themes[theme].background,
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: themes.colors.primary,
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "none",
					},
					"&.Mui-focused": {
						outline: "none",
					},
					"& .MuiSelect-icon": {
						color: "#616161",
						opacity: 0,
						transition: "opacity 0.2s ease",
					},
					"&:hover .MuiSelect-icon": {
						color: "#167595",
						opacity: 1,
					},
				}}
				MenuProps={{
					PaperProps: {
						sx: {
							bgcolor: backgroundColor,
							color: textColor,
						},
					},
				}}
			>
				{items.length > 0 ? (
					items.map(({ id, descripcion }) => (
						<MenuItem
							key={id}
							value={id}
							sx={{
								bgcolor: item === id ? selectedBackground : backgroundColor,
								color: textColor,
								"&:hover": {
									bgcolor: hoverBackground,
								},
								"&.Mui-selected": {
									bgcolor: selectedBackground + " !important",
									color: textColor,
								},
							}}
						>
							{descripcion.charAt(0).toUpperCase() + descripcion.slice(1)}
						</MenuItem>
					))
				) : (
					<MenuItem disabled value="">
						No hay elementos disponibles
					</MenuItem>
				)}
			</Select>
		</FormControl>
	);
}
