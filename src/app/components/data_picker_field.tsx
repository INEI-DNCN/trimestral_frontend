import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import { useThemeContext } from '../../core/theme/ThemeContext';
import dayjs from 'dayjs';

interface Props {
	name: string;
	control: any;
	error?: any;
	label?: string;
}

const DatePickerField: React.FC<Props> = ({ name, control, error, label = 'Fecha de nacimiento' }) => {
	const { theme, themes } = useThemeContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const value = field.value ? dayjs(field.value) : null;

				return (
					<DatePicker
						label={label}
						value={value}
						onChange={(date: any) => {
							const formatted = date ? date.format('YYYY-MM-DD') : '';
							field.onChange(formatted);
						}}
						slotProps={{
							textField: {
								fullWidth: true,
								error: !!error,
								helperText: error?.message,
								variant: 'outlined',
								size: 'small',
								sx: {
									backgroundColor: themes[theme].backgroundBase,
									borderRadius: '8px',
									border: '1px solid #d1d5db',
									color: themes[theme].text,
								},
								InputProps: {
									sx: {
										color: themes[theme].text,
										fontSize: '0.95rem',
										borderRadius: '8px',
										borderColor: theme === 'dark' ? '#334155' : '#cbd5e1',
									},
								},
								InputLabelProps: {
									sx: {
										color: theme === 'dark' ? '#cbd5e1' : '#6b7280',
										background: themes[theme].backgroundBase
									},
								},
							},
							desktopPaper: {
								sx: {
									backgroundColor: themes[theme].background , // fondo popup
									color: themes[theme].text, // texto días
									borderRadius: '8px',
									'& .MuiPickersDay-root': {
										color: themes[theme].text,
									},
									'& .Mui-selected': {
										backgroundColor: themes.colors.primary,
									},
									'& .MuiPickersCalendarHeader-label': {
										color: themes[theme].text,
									},
								},
							},
						}
					}
				/>
				);
			}}
		/>
	);
};

export default DatePickerField;
