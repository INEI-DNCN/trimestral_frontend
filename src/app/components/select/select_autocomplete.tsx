import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller, type Control, type FieldError } from 'react-hook-form';
import styled from 'styled-components';
import { useThemeContext } from '../../../core/theme/ThemeContext';

export interface Option {
  label: string;
  value: string | number;
}

interface Props {
  label: string;
  name: string;
  options: Option[];
  error?: FieldError;
  control: Control<any>;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

const SelectAutoComplete: React.FC<Props> = ({
  label,
  name,
  options,
  error,
  control,
  disabled = false,
  size = 'small',
}) => {
  const { theme, themes } = useThemeContext();

  const background = themes[theme].backgroundBase;
  const color = themes[theme].text;
  const hoverBg = theme === 'dark' ? '#3a3f45' : '#f1f5f9';
  const focusBg = theme === 'dark' ? '#343a40' : '#ffffff';
  const focusRing =
    theme === 'dark'
      ? 'rgba(59, 130, 246, 0.2)'
      : 'rgba(59, 130, 246, 0.1)';


  const inputId = `${name}-input`;

  return (
    <SelectWrapper
      $background={background}
      $hoverBg={hoverBg}
      $focusBg={focusBg}
      $focusRing={focusRing}
      $color={color}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            disablePortal
            options={options}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(opt, val) => opt.value === val?.value}
            value={field.value || null}
            onChange={(_, newValue) => field.onChange(newValue)}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                id={inputId}
                label={label}
                variant="outlined"
                size={size}
                error={!!error}
                helperText={error?.message}
                InputLabelProps={{
                  shrink: true,
                  htmlFor: inputId,
                }}
                inputProps={{
                  ...params.inputProps,
                  id: inputId,
                }}

              />
            )}
          />
        )}
      />
    </SelectWrapper>
  );
};

export default SelectAutoComplete;

const SelectWrapper = styled.div<{
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

	.MuiOutlinedInput-root.Mui-disabled {
		background-color: ${(props) => props.$background};
    
		.MuiOutlinedInput-notchedOutline {
			border-color: #4b5563;
		}
	}

	.MuiInputLabel-root.Mui-disabled {
		color: #94a3b8;
		opacity: 0.7;
	}
`;
