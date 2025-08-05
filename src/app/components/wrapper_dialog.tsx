import {
	Dialog,
	DialogContent,
	DialogTitle,
	Slide,
	useMediaQuery,
	useTheme as useMuiTheme,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import React, { cloneElement, useRef, type ReactElement } from 'react';
import { useThemeContext } from '../../core/theme/ThemeContext';
import { DialogAction } from './enum/enum';

interface Props {
	title: string | undefined,
	open: boolean;
	maxWidth?: 'sm' | 'md' | 'sm' | 'lg' | 'xs' | 'xl';
	handleClose: () => void;
	children: ReactElement<any>;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const WrapperDialog: React.FC<Props> = ({ title, handleClose, maxWidth = 'md', open, children }) => {

	const { theme, themes } = useThemeContext();
	const muiTheme = useMuiTheme();
	const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
	const formRef = useRef<any>(null);



	const currentColors = themes[theme];
	const childWithRef = cloneElement(children, { ref: formRef });

	return (
		<Dialog
			keepMounted={false}
			onClose={title === DialogAction.loadin ? undefined : handleClose}
			open={open}
			fullScreen={isMobile}
			maxWidth={maxWidth}
			fullWidth
			slots={{ transition: Transition }}
			slotProps={{
				paper: {
					sx: {
						backgroundColor: title === DialogAction.loadin ? 'transparent' : currentColors.backgroundBase,
						color: currentColors.text,
						borderRadius: 1,
						boxShadow: `0 4px 20px rgba(0, 0, 0, 0.08)`,
						px: isMobile ? 1 : 3,
						py: 2,
					},
				},
			}}
		>
			{
				!(title === DialogAction.loadin) ? <DialogTitle
					sx={{
						fontSize: '1.5rem',
						fontWeight: 500,
						letterSpacing: '0.5px',
						color: currentColors.text,
						pb: 1,
						fontFamily: `'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
						textTransform: 'none',
					}}
				>
					{title}
				</DialogTitle>
					: null
			}
			<DialogContent
				sx={{
					px: 0.5,
					color: currentColors.text,
					backgroundColor: 'transparent',
				}}
			>
				{childWithRef}
			</DialogContent>
		</Dialog>
	);
};

export default WrapperDialog;
