import {
	Box,
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	Typography,
	CircularProgress,
} from '@mui/material';
import { Form, Formik } from 'formik';
import InputField from '../../../../components/common/InputField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import {
	SnackbarError,
	SnackbarSuccess,
} from '../../../../components/SnackBars';
import publicFetch from '../../../../utils/fetch';
import { facultySignupSchema } from '../../../../schema/schema';

const linkColor = blue[400];

const FacultyForm = ({ userType }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [successMessage, setSuccessMessage] = useState();
	const [errorMessage, setErrorMessage] = useState();

	const signup = async (values, resetForm) => {
		try {
			setLoading(true);
			const data = await publicFetch.post(`/signup`, values);
			setSuccessMessage(data.message);
			setSuccess(true);
			setErrorMessage('');
			resetForm(true);
			setLoading(false);
		} catch (e) {
			const { data } = e.response;
			setErrorMessage(data.message);
			setError(true);
			setSuccessMessage('');
			setLoading(false);
		}
	};

	return (
		<>
			{setSuccessMessage && (
				<SnackbarSuccess
					open={success}
					setOpen={setSuccess}
					message={successMessage}
				/>
			)}
			{setErrorMessage && (
				<SnackbarError open={error} setOpen={setError} message={errorMessage} />
			)}
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					contact: '',
					role: userType,
					password: '',
					confirmPassword: '',
					department: '',
					office: '',
				}}
				validationSchema={facultySignupSchema}
				onSubmit={(values, { resetForm }) => {
					signup(values, resetForm);
				}}
			>
				{(values) => {
					return (
						<Form autoComplete="off" noValidate>
							<Grid
								container
								direction="row"
								spacing={4}
								sx={{ marginTop: 0.5 }}
							>
								<Grid item xs={12} sm>
									<Grid item xs={12}>
										<FormControl fullWidth>
											<InputField
												margin="dense"
												required
												fullWidth
												id="department"
												label="Department"
												name="department"
												autoComplete="off"
												type="text"
												onKeyPress={(evt) => {
													const alpha = /^[a-zA-Z\s]*$/;
													evt.key.replace(alpha, '') && evt.preventDefault();
												}}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12}>
										<FormControl fullWidth>
											<InputField
												margin="dense"
												fullWidth
												id="office"
												label="Office (optional)"
												name="office"
												autoComplete="off"
												type="text"
												onKeyPress={(evt) => {
													const alpha = /^[a-zA-Z\s]*$/;
													evt.key.replace(alpha, '') && evt.preventDefault();
												}}
											/>
										</FormControl>
									</Grid>
									<Grid container direction="row" rowSpacing={1} spacing={2}>
										<Grid item xs={12} sm>
											<FormControl fullWidth>
												<InputField
													margin="dense"
													required
													fullWidth
													id="firstName"
													label="First Name"
													name="firstName"
													autoComplete="off"
													type="text"
													onKeyPress={(evt) => {
														const alpha = /^[a-zA-Z\s]*$/;
														evt.key.replace(alpha, '') && evt.preventDefault();
													}}
												/>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm>
											<FormControl fullWidth>
												<InputField
													margin="dense"
													required
													fullWidth
													id="lastName"
													label="Last Name"
													name="lastName"
													autoComplete="off"
													type="text"
													onKeyPress={(evt) => {
														const alpha = /^[a-zA-Z\s]*$/;
														evt.key.replace(alpha, '') && evt.preventDefault();
													}}
												/>
											</FormControl>
										</Grid>
									</Grid>

									<FormControl fullWidth>
										<InputField
											margin="dense"
											required
											fullWidth
											id="email"
											label="BISU Email (ex. juan.cruz@bisu.edu.ph)"
											name="email"
											autoComplete="off"
											type="email"
										/>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm>
									<Grid
										container
										direction="row"
										alignItems="center"
										spacing={2}
										rowSpacing={1}
									>
										<Grid item xs={2}>
											<Typography
												variant="subtitle1"
												sx={{ textAlign: 'center' }}
											>
												+63
											</Typography>
										</Grid>
										<Grid item xs={10}>
											<FormControl fullWidth>
												<InputField
													margin="dense"
													required
													fullWidth
													id="contact"
													label="Contact No."
													name="contact"
													autoComplete="off"
													type="number"
													onKeyPress={(evt) => {
														['e', 'E', '+', '-', '.'].includes(evt.key) &&
															evt.preventDefault();
													}}
													onInput={(e) => {
														e.target.value = Math.max(
															0,
															parseInt(e.target.value)
														)
															.toString()
															.slice(0, 10);
													}}
												/>
											</FormControl>
										</Grid>
									</Grid>
									<FormControl fullWidth>
										<InputField
											margin="dense"
											name="password"
											type={showPassword ? 'text' : 'password'}
											label="Password"
											autoComplete="off"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={() => setShowPassword(!showPassword)}
															onMouseDown={() => setShowPassword(!showPassword)}
															edge="end"
														>
															{showPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
									</FormControl>
									<FormControl fullWidth>
										<InputField
											margin="dense"
											name="confirmPassword"
											label="Confirm Password"
											type="password"
											autoComplete="off"
										/>
									</FormControl>
								</Grid>
							</Grid>
							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 7, mb: 2 }}
								disabled={loading === true}
								startIcon={
									loading === true ? (
										<CircularProgress size={20} color="primary" />
									) : null
								}
							>
								Sign Up
							</Button>
							<Box>
								<Typography variant="body2" sx={{ color: linkColor }}>
									<Link
										to="/"
										style={{ color: 'inherit', textDecoration: 'none' }}
									>
										Have an account? Log in here
									</Link>
								</Typography>
							</Box>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default FacultyForm;
