import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { useEffect, useState } from "react";
import { useThemeContext } from '../../../core/theme/ThemeContext';

interface Film {
  id: string;
  descripcion: any;
}

interface CheckboxesTagsProps {
  options: Film[];
  value?: Film[];
  onSelectionChange?: (selectedOptions: Film[]) => void;
  label?: string;
  placeholder?: string;
  width?: string;
  showId?: boolean
}

const icon = <FaXmark />;
const checkedIcon = <FaCheck />;

export default function CheckboxesTags({
  options,
  value = [],
  onSelectionChange,
  label = "Checkboxes",
  placeholder = "Favorites",
  width = '100%',
  showId = false
}: CheckboxesTagsProps) {
  const [selectedOptions, setSelectedOptions] = useState<Film[]>(value);

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

  const allOption: Film = { id: 'all', descripcion: -1 };
  const enhancedOptions = [allOption, ...options];

  const allSelected = options.length > 0 && selectedOptions.length === options.length;

  const handleChange = (_: any, newValue: Film[]) => {
    const hasAllOption = newValue.some(opt => opt.id === 'all');

    if (hasAllOption) {
      const nextValue = allSelected ? [] : [...options];
      setSelectedOptions(nextValue);
      onSelectionChange?.(nextValue);
    } else {
      setSelectedOptions(newValue);
      onSelectionChange?.(newValue);
    }
  };

  const { theme, themes } = useThemeContext();

  return (
    <Autocomplete
      multiple
      // limitTags={3}
      id="checkboxes-tags-demo"
      options={enhancedOptions}
      size="small"
      disableCloseOnSelect
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) =>
        option.id === 'all'
          ? allSelected ? 'Deseleccionar todos' : 'Seleccionar todos'
          : option.descripcion.toString()
      }
      value={selectedOptions.filter(opt => opt.id !== 'all')}
      onChange={handleChange}
      sx={{
        width: width,
        // height :40,
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#789FB0" },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#167595" },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#167595" },
        "&.Mui-focused": { outline: "none" },
        "& .MuiChip-root": {
          backgroundColor: "#167595",
          color: "#fff",
          // fontWeight: 500,
          // height: 24,
        },
        "& .MuiChip-deleteIcon": {
          color: "#fff",
          "&:hover": {
            color: "#ccc",
          },
        },
        "& .MuiInputBase-input": {
          color: themes[theme].text,
        },
        "& .MuiAutocomplete-tag": {
          color: themes[theme].text,
        }
      }}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        const isAll = option.id === 'all';

        return (
          <li key={key} {...optionProps} >
            <Checkbox
              icon={isAll ? checkedIcon : icon}
              checkedIcon={isAll ? icon : checkedIcon}
              style={{ marginRight: 8 }}
              checked={isAll ? allSelected : selected}
            />
            <span style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {option.id === 'all'
                ? allSelected ? 'Deseleccionar todos' : 'Seleccionar todos'
                : showId ? option.id +'-'+ option.descripcion: option.descripcion
              }
            </span>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          sx={{
            '& .MuiInputLabel-root': {
              color: "#616161",
            },
            '& .Mui-focused .MuiInputLabel-root': {
              color: themes[theme].text,
            },
            color: '#fff'
          }}
        />
      )}
    />
  );
}
