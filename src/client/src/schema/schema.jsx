import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required'),
});

export const studentSignupSchema = Yup.object().shape({
	role: Yup.string().required('Type is required'),
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	contact: Yup.string()
		.matches(/^(9)/, 'Must start with 9')
		.max(10, 'Must be 10 digits')
		.required('Contact No. is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Confirm your password'),
});

export const facultySignupSchema = Yup.object().shape({
	role: Yup.string().required('Type is required'),
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	contact: Yup.string()
		.matches(/^(9)/, 'Must start with 9')
		.max(10, 'Must be 10 digits')
		.required('Contact No. is required'),
	department: Yup.string()
		.required('Department is required')
		.min(5, 'Must be at least 5 characters'),
	office: Yup.string().min(5, 'Must be at least 5 characters'),
	password: Yup.string().required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Confirm your password'),
});

export const staffSignupSchema = Yup.object().shape({
	role: Yup.string().required('Type is required'),
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	contact: Yup.string()
		.matches(/^(9)/, 'Must start with 9')
		.max(10, 'Must be 10 digits')
		.required('Contact No. is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	office: Yup.string()
		.min(5, 'Must be at least 5 characters')
		.required('Office name is required'),
	password: Yup.string().required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Confirm your password'),
});

export const requestSchema = Yup.object().shape({
	title: Yup.string().required('Title is required'),
	reqType: Yup.string().required('Type is required'),
	description: Yup.string().required('Description is required'),
});

export const teamSchema = Yup.object().shape({
	type: Yup.string().required('Title is required'),
	members: Yup.string().required('A new member is required'),
});

export const approveRequestSchema = Yup.object().shape({
	personel: Yup.string().required('Personel is required'),
});

export const rejectRequestSchema = Yup.object().shape({
	reason: Yup.string().required('Personel is required'),
});
