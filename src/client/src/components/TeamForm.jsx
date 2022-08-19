import {
	Box,
	CircularProgress,
	FormHelperText,
	MenuItem,
	Select,
} from '@mui/material';
import { Form, Formik, useField } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FetchContext } from '../context/FetchContext';
import CustomButton from './common/CustomButton';
import { teamSchema } from '../schema/schema';
import { SnackbarSuccess } from './SnackBars';

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

const TeamForm = ({ type, team, handleClose }) => {
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);
	const [success, setSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState();
	const [loading, setLoading] = useState(false);
	const [records, setRecords] = useState([]);

	const getDifference = (arr1, arr2) => {
		return arr1.filter((item) => {
			return !arr2.some((item2) => {
				return item._id === item2._id;
			});
		});
	};

	const getAdminUsers = async () => {
		try {
			const { data } = await fetchContext.authAxios.get('/users/admins');
			setRecords(data);
		} catch (error) {
			console.log(error);
		}
	};

	const createTeam = async (values, resetForm) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.patch('/teams', values);
			setSuccessMessage(data.message);
			setSuccess(true);
			resetForm(true);
			setLoading(false);
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAdminUsers();

		//   return () => {
		// 	second
		//   }
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
			<Box>
				<Formik
					initialValues={{
						type: type,
						members: '',
					}}
					validationSchema={teamSchema}
					onSubmit={(values, { resetForm }) => {
						createTeam(values, resetForm);
					}}
				>
					{({ values }) => {
						return (
							<Form autoComplete="off" noValidate>
								<Box sx={{ marginTop: 2 }}>
									<MemberSelection name="members" fullWidth>
										{getDifference(records, team?.members).map((admin, k) => {
											return (
												<MenuItem value={admin?._id} key={k}>
													{admin?.firstName} {admin?.lastName}
												</MenuItem>
											);
										})}
									</MemberSelection>
								</Box>
								<Box sx={{ marginTop: 4 }}>
									<CustomButton
										fullWidth
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

export default TeamForm;
