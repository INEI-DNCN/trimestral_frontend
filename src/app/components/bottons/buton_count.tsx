import { Box } from '@mui/material';
import { useThemeContext } from '../../../core/theme/ThemeContext';

interface Props {
	content:string;
	count: number;
	onClick?: () => void;
}

const ButtonCount = ({ content ,count, onClick }: Props) => {
	const { theme, themes } = useThemeContext();

	return (
		<Box
		onClick={onClick}
		sx={{
			cursor: 'pointer',
			display: 'inline-flex',
			alignItems: 'center',
			gap: 1,
			px: 2,
			py: 0.75,
			borderRadius: '999px',
			backgroundColor:  themes[theme].menu.backgroundSub,
			color: themes[theme].text,
			fontWeight: 500,
			fontSize: '13px',
			lineHeight: 1.2,
			transition: 'background-color 0.2s ease',
			'&:hover': {
			backgroundColor: themes[theme].menu.backgroundActive ,
			},
		}}
		>
		<Box
			sx={{
			minWidth: 20,
			height: 20,
			borderRadius: '50%',
			backgroundColor:  themes[theme].menu.backgroundActive,
			color: '#fff',
			fontSize: '12px',
			fontWeight: 600,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			}}
		>
			{count || 0}
		</Box>
		<Box
			sx={{
			whiteSpace: 'nowrap',
			}}
		>
			{content}{count === 1 ? '' : 's'}
		</Box>
		</Box>
	);
};

export default ButtonCount;
