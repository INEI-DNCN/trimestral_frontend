// general/components/buttons/ButtonAction.tsx
import { Button, type ButtonProps } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../core/theme/ThemeContext';

interface Props extends ButtonProps {
	children: React.ReactNode;
	startIcon?: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	backgroundColor?: string; // Nuevo prop opcional
}

const ButtonAction: React.FC<Props> = ({ type = 'button', children, startIcon, backgroundColor, ...rest }) => {
	const { themes } = useThemeContext();

	const bgColor = backgroundColor || themes.colors.primary;

	return (
		<Button
			variant="contained"
			startIcon={startIcon}
			type={type}
			sx={{
				textTransform: 'none',
				fontWeight: 500,
				backgroundColor: bgColor,
				color: '#fff',
				px: 2.5,
				boxShadow: 'none',
				'&:hover': {
					backgroundColor: backgroundColor ? backgroundColor : themes.colors.primaryHover,
				},
			}}
			{...rest}
		>
			{children}
		</Button>
	);
};

export default ButtonAction;
