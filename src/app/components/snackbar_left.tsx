import { Slide, type SlideProps } from '@mui/material';

export type TransitionProps = Omit<SlideProps, 'direction'>;

export function TransitionLeft(props: TransitionProps) {
	return <Slide {...props} direction="down" />;
}