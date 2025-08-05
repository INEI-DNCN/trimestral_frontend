import { Pagination } from '@mui/material';
import styled from 'styled-components';
import { useThemeContext } from '../../core/theme/ThemeContext';

interface PaginationCircleProps {
	count: number;
	page: number;
	onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginationCircle({ count, page, onChange }: PaginationCircleProps) {
	const { themes, theme } = useThemeContext();
	const currentTheme = themes[theme];

	return (
		<PaginationContainer $theme={currentTheme}>
		<StyledPagination
			count={count}
			page={page}
			onChange={onChange}
			size="small"
			color="primary"
			$theme={currentTheme}
		/>
		</PaginationContainer>
	);
}

const PaginationContainer = styled.div<{ $theme: any }>`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px 16px;
	border-radius: 12px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
	background-color: ${({ $theme }) => $theme.background};
`;

const StyledPagination = styled(Pagination)<{ $theme: any }>`
	.MuiPagination-ul {
		gap: 6px;

		li > button {
		border-radius: 50%;
		background-color: ${({ $theme }) => $theme.backgroundBase};
		color: ${({ $theme }) => $theme.text};
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		transition: all 0.2s ease;

		&:hover {
			background-color: ${({ $theme }) => $theme.menu.backgroundActive};
			color: ${({ $theme }) => $theme.text};
			transform: scale(1.05);
		}

		&.Mui-selected {
			background-color: #3b82f6;
			color: #ffffff;

			&:hover {
			background-color: #2563eb;
			}
		}
		}
	}
`;
