// components/users/InputfieldSearch.tsx
import React from 'react';
import { InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import { Search as SearchIcon } from 'lucide-react'; // o cualquier otro icono que uses
import styled from 'styled-components';
import { useThemeContext } from '../../core/theme/ThemeContext';

interface Props extends Omit<TextFieldProps, 'variant'> {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

const InputfieldSearch: React.FC<Props> = ({
	value,
	onChange,
	placeholder = 'Buscar...',
	...rest
	}) => {

	const { theme, themes } = useThemeContext();
	const searchColors = {
		input: {
			bg: themes[theme].backgroundBase,
			hover: themes[theme].menu.backgroundActive,
			focusBg: themes[theme].background,
			focusBorder: '#3b82f6',
			focusShadow: 'rgba(59, 130, 246, 0.1)',
			text: themes[theme].text,
		},
	};

	return (
		<SearchField
		fullWidth
		placeholder={placeholder}
		value={value}
		onChange={onChange}
		size="small"
		$themeColors={searchColors}
		InputProps={{
			startAdornment: (
			<InputAdornment position="start">
				<SearchIcon color={'#9ca3af'} size={16} />
			</InputAdornment>
			),
		}}
		{...rest}
		/>
	);
	};

	export default InputfieldSearch;

	// Campo de búsqueda estilizado
	const SearchField = styled(TextField)<{ $themeColors: any }>`
	&& {
		.MuiOutlinedInput-root {
		border-radius: 8px;
		background-color: ${({ $themeColors }) => $themeColors.input.bg};
		border: 1px solid transparent;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
		transition: all 0.2s ease;

		&:hover {
			background-color: ${({ $themeColors }) => $themeColors.input.hover};
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
		}

		&.Mui-focused {
			background-color: ${({ $themeColors }) => $themeColors.input.focusBg};
			border-color: ${({ $themeColors }) => $themeColors.input.focusBorder};
			box-shadow: 0 0 0 3px ${({ $themeColors }) => $themeColors.input.focusShadow};
		}

		.MuiOutlinedInput-notchedOutline {
			border: none;
		}
		}

		input {
		color: ${({ $themeColors }) => $themeColors.input.text};
		}
	}
`;
