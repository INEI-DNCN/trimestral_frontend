import { TextField } from '@mui/material';
import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import { useThemeContext } from '../../core/theme/ThemeContext';

interface Props {
	label: string;
	type?: string;
	error?: any;
	maxLength?: number;
	size?: 'small' | 'medium';
	register: UseFormRegisterReturn;
	onKeyUp?: () => void;
	disabled?: boolean; // 👈 nueva prop
	multiline?: boolean; // 👈 nueva prop
}

const InputField: React.FC<Props> = ({
	label,
	type = 'text',
	error,
	maxLength,
	size = 'small',
	register,
	disabled,
	multiline = false,
	onKeyUp,
}) => {
	const { theme, currentTheme } = useThemeContext();

	const background = currentTheme.backgroundBase;
	const color = currentTheme.text;
	const hoverBg = theme === 'dark' ? '#3a3f45' : '#f1f5f9';
	const focusBg = theme === 'dark' ? '#343a40' : '#ffffff';
	const focusRing = theme === 'dark'
		? 'rgba(59, 130, 246, 0.2)'
		: 'rgba(59, 130, 246, 0.1)';

	return (
		<FieldWrapper
			$background={background}
			$hoverBg={hoverBg}
			$focusBg={focusBg}
			$focusRing={focusRing}
			$color={color}
		>
			<TextField
				label={label}
				type={type}
				multiline={multiline}
				size={size}
				fullWidth
				disabled={disabled}
				inputProps={maxLength ? { maxLength } : {}}
				{...register}
				onKeyUp={onKeyUp}
				variant="outlined"
			/>
			{error && <small>{error.message}</small>}
		</FieldWrapper>
	);
};

export default InputField;

const FieldWrapper = styled.div<{
	$background: string;
	$hoverBg: string;
	$focusBg: string;
	$focusRing: string;
	$color: string;
}>`
	flex: 1;
	min-width: 200px;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;

	.MuiOutlinedInput-root {
		border-radius: 8px;
		background-color: ${(props) => props.$background};
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
		transition: all 0.2s ease;

		&:hover {
			background-color: ${(props) => props.$hoverBg};
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
		}

		&.Mui-focused {
			background-color: ${(props) => props.$focusBg};
			box-shadow: 0 0 0 3px ${(props) => props.$focusRing};
		}
	}

	.MuiOutlinedInput-notchedOutline {
		border-color: #d1d5db;
		transition: border-color 0.2s ease;

	}

	.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
		border-color: #94a3b8;
	}

	.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
		border-color: #3b82f6;
	}

	.MuiInputLabel-root {
		color: #94a3b8;
		font-weight: 500;

		&.Mui-focused {
			color: #3b82f6;
		}
	}

	.MuiOutlinedInput-input {
		color: ${(props) => props.$color};
		font-weight: 400;
	}

	.MuiOutlinedInput-root.Mui-disabled input,
	.MuiOutlinedInput-root.Mui-disabled textarea {
		color: #95A3B8 !important;
		-webkit-text-fill-color: #95A3B8 !important;
	}



	small {
		color: #e74c3c;
		padding-left: 0.5rem;
		font-size: 0.75rem;
	}
	.MuiOutlinedInput-root.Mui-disabled {
		background-color: ${(props) => props.$background};
		.MuiOutlinedInput-notchedOutline {
			border-color: #4b5563;
		}
		.MuiInputLabel-root.Mui-disabled {
			color: #94a3b8;
			opacity: 0.7;
		}

	}

	.MuiInputLabel-root.Mui-disabled {
		color: #94a3b8;
		opacity: 0.7;
	}
`;