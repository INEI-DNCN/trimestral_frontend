import React from 'react';
import { Button, type ButtonProps } from '@mui/material';
import { useThemeContext } from '../../../core/theme/ThemeContext';

const ButtonCancel: React.FC<ButtonProps> = ({ children, ...props }) => {
	const { theme, themes } = useThemeContext();
	return (
		<Button
		variant="text"
		sx={{
			textTransform: 'none',
			fontWeight: 500,
			color: themes.colors.disabled,
			'&:hover': {
			backgroundColor: theme === 'dark' ? '#495057' : '#f1f1f1',
			},
		}}
		{...props}
		>
		{children}
		</Button>
	);
};

export default ButtonCancel;
