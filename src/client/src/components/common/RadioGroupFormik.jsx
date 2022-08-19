import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

const renderOptions = (options) => {
	return options.map((option) => (
		<FormControlLabel
			key={option}
			value={option}
			control={<Radio />}
			label={option}
		/>
	));
};

const RadioGroupFormik = ({
	field,
	form: { touched, errors },
	name,
	options,
	children,
	...props
}) => {
	const fieldName = name || field.name;

	return (
		<React.Fragment>
			<RadioGroup {...field} {...props} name={fieldName}>
				{/* Here you either map over the props and render radios from them,
         or just render the children if you're using the function as a child*/}
				{options ? renderOptions(options) : children}
			</RadioGroup>

			{touched[fieldName] && errors[fieldName] && (
				<span style={{ color: 'red', fontFamily: 'sans-serif' }}>
					{errors[fieldName]}
				</span>
			)}
		</React.Fragment>
	);
};

export default RadioGroupFormik;
