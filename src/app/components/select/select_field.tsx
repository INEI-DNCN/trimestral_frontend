import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { Controller, type Control, type FieldError } from 'react-hook-form';
import styled from 'styled-components';
import { useThemeContext } from '../../../core/theme/ThemeContext';

interface Option {
  value: string;
  label: string;
}

interface Props {
  name: string;
  control: Control<any>;
  label: string;
  options: Option[];
  error?: FieldError;
  disabled?: boolean;
  size?: 'small' | 'medium';
  onChange?: (value: string) => void; // ← nueva prop
}

const SelectField: React.FC<Props> = ({
  name,
  control,
  label,
  options,
  error,
  disabled = false,
  size = 'small',
  onChange,
}) => {
  const { theme, themes } = useThemeContext();
  const background = themes[theme].backgroundBase;
  const color = themes[theme].text;
  const hoverBg = theme === 'dark' ? '#3a3f45' : '#f1f5f9';
  const focusBg = theme === 'dark' ? '#343a40' : '#ffffff';
  const focusRing = theme === 'dark'
    ? 'rgba(59, 130, 246, 0.2)'
    : 'rgba(59, 130, 246, 0.1)';

  const fieldId = `select-${name}`;

  return (
    <FieldWrapper
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
          <TextField
            select
            fullWidth
            id={fieldId}
            label={label}
            size={size}
            disabled={disabled}
            error={!!error}
            helperText={error?.message}
            value={field.value ?? ''}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e.target.value); // ← llama al handler externo si existe
            }}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </FieldWrapper>
  );
};

export default SelectField;

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

  .MuiOutlinedInput-input {
    color: ${(props) => props.$color};
    font-weight: 400;
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

  .MuiOutlinedInput-root.Mui-disabled input {
    color: #95A3B8 !important;
    -webkit-text-fill-color: #95A3B8 !important;
  }

  small, .MuiFormHelperText-root.Mui-error {
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
