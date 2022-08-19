import {
	Box,
	Button,
	Container,
	FormControl,
	IconButton,
	InputAdornment,
	Typography,
	CircularProgress,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/common/InputField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { loginSchema } from '../../../schema/schema';
import { useContext, useEffect, useRef, useState } from 'react';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import publicFetch from '../../../utils/fetch';
import { SnackbarError, SnackbarSuccess } from '../../../components/SnackBars';
import { AuthContext } from '../../../context/AuthContext';

const linkColor = blue[400];

const Login = () => {
	const _isMounted = useRef(true);
	const history = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [successMessage, setSuccessMessage] = useState();
	const [errorMessage, setErrorMessage] = useState();
	const [loading, setLoading] = useState(false);
	const authContext = useContext(AuthContext);

	const login = async (values, resetForm) => {
		try {
			setLoading(true);
			const { data } = await publicFetch.post(`/login`, values);
			authContext.setAuthState(data);
			setSuccessMessage(data.message);
			setSuccess(true);
			setErrorMessage('');
			resetForm(true);
			setLoading(false);
			// const response = await
		} catch (e) {
			const { data } = e.response;
			setErrorMessage(data.message);
			setError(true);
			setSuccessMessage('');
			setLoading(false);
		}
		return () => {
			_isMounted.current = false;
		};
	};

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (!authContext.isAuthenticated()) {
				history('/', { replace: true });
			} else {
				history('/dashboard', { replace: true });
			}
		}

		return () => {
			isMounted = false;
			_isMounted.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{successMessage && (
				<SnackbarSuccess
					open={success}
					setOpen={setSuccess}
					successMessage={successMessage}
				/>
			)}
			{errorMessage && (
				<SnackbarError
					open={error}
					setOpen={setError}
					errorMessage={errorMessage}
				/>
			)}
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 20,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component="h1" variant="h4">
						MIS HELP DESK
					</Typography>
					<Typography component="h2" variant="h5" sx={{ marginTop: 4 }}>
						Sign in
					</Typography>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={loginSchema}
						onSubmit={(values, { resetForm }) => {
							login(values, resetForm);
						}}
					>
						{() => (
							<Form autoComplete="off" noValidate sx={{ mt: 1 }}>
								<FormControl fullWidth>
									<InputField
										margin="normal"
										required
										fullWidth
										id="email"
										label="BISU Email"
										name="email"
										autoComplete="off"
									/>
								</FormControl>
								<FormControl fullWidth>
									<InputField
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
														{showPassword ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</FormControl>

								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									disabled={loading === true}
									startIcon={
										loading === true ? (
											<CircularProgress size={20} color="primary" />
										) : null
									}
								>
									Sign In
								</Button>
							</Form>
						)}
					</Formik>
					<Box>
						<Typography variant="body2" sx={{ color: linkColor }}>
							<Link
								to="/signup"
								style={{ color: 'inherit', textDecoration: 'none' }}
							>
								No account yet? Sign up here
							</Link>
						</Typography>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default Login;
