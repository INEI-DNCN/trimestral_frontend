// components/users/HeaderSummary.tsx
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../core/theme/ThemeContext';

interface Props {
	title?: string;
	subtitle?: string;
}

const Header: React.FC<Props> = ({ title = "Title", subtitle = 'sub title' }) => {
	const { theme, themes } = useThemeContext();

	return (
		<Box>
			<Typography
				variant="h5"
				sx={{ fontWeight: 600, color: themes[theme].text, mb: 0.25 }}
			>
				{title}
			</Typography>
			<Typography
				variant="body2"
				sx={{ color: "#ccc", fontSize: "0.8rem" }}
			>
				{subtitle}
			</Typography>
		</Box>
	);
};

export default Header;
