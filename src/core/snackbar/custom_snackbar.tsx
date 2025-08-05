import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';
import type { AlertColor, SlideProps } from '@mui/material';
import { getAppleStyleColor } from '../../app/utils/utils_snackbar';

interface CustomSnackbarProps {
	open: boolean;
	onClose: () => void;
	message: string;
	severity: AlertColor;
	autoHideDuration?: number;
}

const SlideTransition = (props: SlideProps) => {
	return <Slide {...props} direction="down" />;
};

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
	open,
	onClose,
	message,
	severity,
	autoHideDuration = 3000,
	}) => {
	return (
		<Snackbar
		open={open}
		onClose={onClose}
		TransitionComponent={SlideTransition}
		message={message}
		autoHideDuration={autoHideDuration}
		key="custom-snackbar"
		anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
		<Alert
			onClose={onClose}
			severity={severity}
			variant="filled"
			sx={{
			width: '100%',
			borderRadius: '12px',
			boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
			backgroundColor: getAppleStyleColor(severity),
			color: '#fff',
			fontWeight: 500,
			letterSpacing: '0.3px',
			fontSize: '0.875rem',
			backdropFilter: 'blur(6px)',
			border: '1px solid rgba(255, 255, 255, 0.2)',
			}}
		>
			{message}
		</Alert>
		</Snackbar>
	);
};
