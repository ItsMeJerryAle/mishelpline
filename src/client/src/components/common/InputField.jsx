import { FormHelperText, TextField } from '@mui/material';
import { useField } from 'formik';

const InputField = ({ type, autoComplete, label, ...props }) => {
	const [field, meta] = useField(props.name);
	const errorText = meta.error && meta.touched ? meta.error : '';

	return (
		<>
			<TextField
				name={field.name}
				{...field}
				label={label}
				variant="outlined"
				error={!!errorText}
				autoComplete={autoComplete}
				type={type}
				onChange={(e) => {
					field.onChange(props.name)(e.target.value);
				}}
				{...props}
			/>
			<FormHelperText error>{errorText}</FormHelperText>
		</>
	);
};

export default InputField;
