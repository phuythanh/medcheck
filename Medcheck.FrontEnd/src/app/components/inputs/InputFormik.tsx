import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FormikConfig } from 'formik';
interface IProps {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  formik: FormikConfig<unknown> | any;
  option?: {
    label: string;
    value: string;
    items: any[];
  };
}

export const InputFormik = ({ name, type = 'text', label, formik, option }: IProps) => {
  return (
    <FormControl variant="standard" fullWidth={true} margin={'normal'}>
      <TextField
        select={type === 'select'}
        fullWidth
        id={name}
        name={name}
        label={label || name}
        type={type}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      >
        {type === 'select' &&
          option &&
          option.items.map((op, index) => (
            <MenuItem key={index} value={op[option.value]}>
              {op[option.label]}
            </MenuItem>
          ))}
      </TextField>
    </FormControl>
  );
};
