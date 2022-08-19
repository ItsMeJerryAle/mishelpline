import {
	Box,
	CircularProgress,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import { Form, Formik, useField } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { approveRequestSchema } from '../../schema/schema';
import { SnackbarError, SnackbarSuccess } from "../SnackBars";
import { FetchContext } from './../../context/FetchContext';
import CustomButton from './../common/CustomButton';

const MemberSelection = ({ name, ...props }) => {
	const [field, meta] = useField(name);
	const errorText = meta.error && meta.touched ? meta.error : '';

	return (
		<>
			<Select
				name={field.name}
				{...field}
				fullWidth
				error={!!errorText}
				{...props}
			>
				{props.children}
			</Select>
			<FormHelperText error>{errorText}</FormHelperText>
		</>
	);
};

const Approve = ({ record, handleClose }) => {
	const fetchContext = useContext(FetchContext);
	const [records, setRecords] = useState({});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [successMessage, setSuccessMessage] = useState();
	const [errorMessage, setErrorMessage] = useState();

	const getTeam = async () => {
		try {
			const { data } = await fetchContext.authAxios.get(
				`/teams/${record?.title}`
			);
			setRecords(data[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const approveReq = async (values, resetForm) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.patch(
				`/request/approve/${record?._id}`,
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

	useEffect(() => {
		getTeam();
		// return () => {
		// 	second;
		// };
	}, []);

	const date = new Date(record?.createdAt);
	const monthWithoutZero = date.getMonth() + 1;
	const month =
		monthWithoutZero < 10 ? `0${monthWithoutZero}` : monthWithoutZero;
	const dayWithoutZero = date.getDate();
	const day = dayWithoutZero < 10 ? `0${dayWithoutZero}` : dayWithoutZero;

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
				<Box>
					<Typography variant="h3" component="span">
						{record?.ticketNo}{' '}
					</Typography>
					<Typography variant="subtitle1" component="span">
						file dated{' '}
					</Typography>
					<Typography variant="h5" component="span">
						{month}/{day}
					</Typography>
				</Box>
				<Box mt={4}>
					<Typography
						sx={{ textTransform: 'capitalize' }}
						variant="h5"
						component="span"
					>
						{record?.title} Assistance
					</Typography>
					<Typography
						sx={{ textTransform: 'uppercase' }}
						variant="h5"
						component="span"
					>
						{' '}
						({record?.reqType})
					</Typography>
				</Box>
				<Formik
					initialValues={{ personel: '' }}
					validationSchema={approveRequestSchema}
					onSubmit={(values, { resetForm }) => {
						// console.log(values);
						approveReq(values, resetForm);
					}}
				>
					{(values) => {
						return (
							<Form autoComplete="off" noValidate>
								<Box mt={4}>
									<FormControl fullWidth>
										<InputLabel id="Admin-Selection-label">
											Assign Administrator
										</InputLabel>
										<MemberSelection
											label="Assigned Administrator"
											name="personel"
											fullWidth
										>
											{records?.members?.map((item, index) => (
												<MenuItem
													key={index}
													value={item?._id}
												>{`${item?.firstName} ${item?.lastName}`}</MenuItem>
											))}
										</MemberSelection>
									</FormControl>
								</Box>

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

export default Approve;
