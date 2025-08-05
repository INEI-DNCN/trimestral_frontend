import styled from "styled-components";
import { themes } from "../../core/theme/ThemeContext";



type FlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type FlexAlign = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
type TextAlign = 'left' | 'right' | 'center' | 'justify';

type PaddingProps = {
	p?: number;
	px?: number;
	py?: number;
	pt?: number;
	pb?: number;
	pl?: number;
	pr?: number;
};

type MarginProps = {
	m?: number;
	mx?: number;
	my?: number;
	mt?: number;
	mb?: number;
	ml?: number;
	mr?: number;
};

// Corrige para evitar pasar props personalizados al DOM
export const Row = styled.div.withConfig({
	shouldForwardProp: (prop) =>
		![
		'justifyContent',
		'alignItems',
		'gap',
		'flex',
		'p',
		'px',
		'py',
		'pt',
		'pb',
		'pl',
		'pr',
		'm',
		'mx',
		'my',
		'mt',
		'mb',
		'ml',
		'mr',
		].includes(prop),
	})<{
	justifyContent?: FlexJustify;
	alignItems?: FlexAlign;
	gap?: string;
	flex?: string;
	} & PaddingProps & MarginProps>`
	display: flex;
	justify-content: ${(props) => props.justifyContent || 'auto'};
	align-items: ${(props) => props.alignItems || 'auto'};
	flex: ${(props) => props.flex ?? 'initial'};
	gap: ${(props) => props.gap || '8px'};

	/* Padding */
	padding-top: ${(props) =>
		getSpacingValue(props.pt ?? props.py ?? props.p)};
	padding-bottom: ${(props) =>
		getSpacingValue(props.pb ?? props.py ?? props.p)};
	padding-left: ${(props) =>
		getSpacingValue(props.pl ?? props.px ?? props.p)};
	padding-right: ${(props) =>
		getSpacingValue(props.pr ?? props.px ?? props.p)};

	/* Margin */
	margin-top: ${(props) =>
		getSpacingValue(props.mt ?? props.my ?? props.m)};
	margin-bottom: ${(props) =>
		getSpacingValue(props.mb ?? props.my ?? props.m)};
	margin-left: ${(props) =>
		getSpacingValue(props.ml ?? props.mx ?? props.m)};
	margin-right: ${(props) =>
		getSpacingValue(props.mr ?? props.mx ?? props.m)};
`;

// Helper: convierte el valor a píxeles usando escala de 8px
const getSpacingValue = (value?: number): string => {
  return value !== undefined ? `${value * 8}px` : '0px';
};

export const RowFrom = styled.form<{justifyContent?:any,alignItems?:any, gap?:any}>`
	display: flex;
	align-items: center;
	justify-content: ${(props) => props.justifyContent || 'start'};
	gap: ${(props) => props.gap || '8px'};
	width: 100%;
`;

export const Column = styled.div.withConfig({
	shouldForwardProp: (prop) =>
		![
		'justifyContent',
		'alignItems',
		'gap',
		'width',
		'textAlign',
		'flex',
		'p',
		'px',
		'py',
		'pt',
		'pb',
		'pl',
		'pr',
		'm',
		'mx',
		'my',
		'mt',
		'mb',
		'ml',
		'mr',
		].includes(prop),
	})<{
		justifyContent?: FlexJustify;
		gap?: string;
		alignItems?: FlexAlign;
		width?: string;
		textAlign?: TextAlign;
		flex?: string;
	} & PaddingProps & MarginProps>`
		display: flex;
		flex-direction: column;
		flex: ${(props) => props.flex ?? 'initial'};
		gap: ${(props) => props.gap ?? '8px'};
		align-items: ${(props) => props.alignItems ?? 'stretch'};
		width: ${(props) => props.width ?? 'auto'};
		text-align: ${(props) => props.textAlign ?? 'left'};
		justify-content: ${(props) => props.justifyContent || 'auto'};

		/* Padding */
		padding-top: ${(props) =>
			getSpacingValue(props.pt ?? props.py ?? props.p)};
		padding-bottom: ${(props) =>
			getSpacingValue(props.pb ?? props.py ?? props.p)};
		padding-left: ${(props) =>
			getSpacingValue(props.pl ?? props.px ?? props.p)};
		padding-right: ${(props) =>
			getSpacingValue(props.pr ?? props.px ?? props.p)};

		/* Margin */
		margin-top: ${(props) =>
			getSpacingValue(props.mt ?? props.my ?? props.m)};
		margin-bottom: ${(props) =>
			getSpacingValue(props.mb ?? props.my ?? props.m)};
		margin-left: ${(props) =>
			getSpacingValue(props.ml ?? props.mx ?? props.m)};
		margin-right: ${(props) =>
			getSpacingValue(props.mr ?? props.mx ?? props.m)};
	`;



export const Container = styled.main<{ }>`
	width: 100%;
	height: 100vh;
	display: flex;
	color: #000;
	flex-direction: column;
	gap: 10px;
	box-sizing: border-box;
	overflow-x: "auto";
	header{
		display: flex;
		flex-direction: column;
	}
	article{
		flex: 1;
		padding: 20px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.scrollTableBody{
		flex: 1;
		overflow-y: auto;
		::-webkit-scrollbar {
			width: 5px;
			height: 5px;
		}
		::-webkit-scrollbar-track {
			background: transparent;
		}
		::-webkit-scrollbar-thumb {
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 6px;
		}
		::-webkit-scrollbar-thumb:hover {
			background-color: ${themes.colors.primary};
		}
		::-webkit-scrollbar-thumb:active {
			background-color: ${themes.colors.primary};
		}
	}

`;


export const ScrollFade = styled.div`
	position: relative;
	flex: 1;
	overflow-y: auto;
	padding-inline-end: 4px;

	/* Fade solo en la parte inferior */
	mask-image: linear-gradient(
		to bottom,
		black 0px,
		black calc(100% - 24px),
		transparent 100%
	);

	-webkit-mask-image: linear-gradient(
		to bottom,
		black 0px,
		black calc(100% - 24px),
		transparent 100%
	);

	/* Scrollbar moderno estilo ChatGPT */
	scrollbar-width: thin;
	scrollbar-color: #c4c4c4 transparent; /* Firefox */

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #c4c4c4;
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: #a0a0a0;
	}
`;


