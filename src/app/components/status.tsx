// components/users/StatusSummary.tsx
import React from 'react';
import { Divider, Typography } from '@mui/material';
import { Column, Row } from '../style_components/witgets_style_components';
import { useThemeContext } from '../../core/theme/ThemeContext';

interface Props {
	activeUsers: number;
	inactiveUsers: number;
	totalUsers: number;
}

const Status: React.FC<Props> = ({ activeUsers, inactiveUsers, totalUsers }) => {
	const { theme, themes } = useThemeContext();

	return (
		<Row alignItems="center" gap="1.5rem">
			<Column alignItems="center" textAlign="center" gap="0px">
				<Typography
					variant="h6"
					sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#10b981', lineHeight: 1 }}
				>
					{activeUsers}
				</Typography>
				<Typography
					variant="caption"
					sx={{ color: themes[theme].text, fontSize: '0.7rem' }}
				>
					Activos
				</Typography>
			</Column>

			<Divider orientation="vertical" flexItem sx={{ background: '#ccc', height: '2rem' }} />

			<Column alignItems="center" textAlign="center" gap="0px">
				<Typography
					variant="h6"
					sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#ef4444', lineHeight: 1 }}
				>
					{inactiveUsers}
				</Typography>
				<Typography
					variant="caption"
					sx={{ color: themes[theme].text, fontSize: '0.7rem' }}
				>
					Inactivos
				</Typography>
			</Column>

			<Divider orientation="vertical" flexItem sx={{ background: '#ccc', height: '2rem' }} />

			<Column alignItems="center" textAlign="center" gap="0px">
				<Typography
					variant="h6"
					sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#3b82f6', lineHeight: 1 }}
				>
					{totalUsers}
				</Typography>
				<Typography
					variant="caption"
					sx={{ color: themes[theme].text, fontSize: '0.7rem' }}
				>
					Total
				</Typography>
			</Column>
		</Row>
	);
};

export default Status;
