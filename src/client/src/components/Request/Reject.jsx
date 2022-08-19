import { Box, CircularProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { FetchContext } from '../../context/FetchContext';
import { rejectRequestSchema } from '../../schema/schema';
import CustomButton from '../common/CustomButton';
import InputField from '../common/InputField';
import { SnackbarError, SnackbarSuccess } from '../SnackBars';

const Reject = ({ record, handleClose }) => {
	const fetchContext = useContext(FetchContext);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [successMessage, setSuccessMessage] = useState();
	const [errorMessage, setErrorMessage] = useState();

	const rejectReq = async (values, resetForm) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.patch(
				`/request/reject/${record?._id}`,
				values
			);
			setSuccessMessage(data.message);
			setSuccess(true);
			setErrorMessage('');
			resetForm(true);
			setLoading(false);
			handleClose();
		} catch (e) {
			const { data } = e?.response;
			setErrorMessage(data?.message);
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
			<Box>
				<Formik
					initialValues={{ reason: '' }}
					validationSchema={rejectRequestSchema}
					onSubmit={(values, { resetForm }) => {
						// console.log(values);
						rejectReq(values, resetForm);
					}}
				>
					{(values) => {
						return (
							<Form autoComplete="off" noValidate>
								<InputField
									multiline
									fullWidth
									rows={5}
									sx={{ marginTop: 1.5 }}
									name="reason"
									onKeyPress={(evt) => {
										const alpha = /^[a-zA-Z\s]*$/;
										evt.key.replace(alpha, '') && evt.preventDefault();
									}}
								/>
								<Box mt={4}>
									<CustomButton
										type="submit"
										color="success"
										disabled={loading === true}
										startIcon={
											loading === true ? (
												<CircularProgress size={20} color="primary" />
											) : null
										}
									>
										Submit
									</CustomButton>
								</Box>
							</Form>
						);
					}}
				</Formik>
			</Box>
		</>
	);
};

export default Reject;
