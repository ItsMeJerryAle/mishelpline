import {
	Alert,
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	FormControl,
	FormControlLabel,
	Paper,
	Radio,
	Typography,
} from '@mui/material';
import MemoryIcon from '@mui/icons-material/Memory';
import AlbumIcon from '@mui/icons-material/Album';
import StorageIcon from '@mui/icons-material/Storage';
import LanguageIcon from '@mui/icons-material/Language';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputField from '../../../components/common/InputField';
import { Formik, Form, Field } from 'formik';
import { Link, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import RadioGroupFormik from '../../../components/common/RadioGroupFormik';
import { useContext, useState } from 'react';
import { FetchContext } from '../../../context/FetchContext';
import { requestSchema } from '../../../schema/schema';
import PopupDialog from '../../../components/common/PopupDialog';
import { SnackbarError, SnackbarSuccess } from '../../../components/SnackBars';
import Ticket from '../../../components/Ticket';
import CustomButton from '../../../components/common/CustomButton';

const dataOptions = [
	'backup',
	'recovery',
	'website content',
	'social media content',
];
const softwareOptions = ['installation', 'maintenance'];
const hardwareOptions = ['setup', 'maintenance'];
const networkOptions = ['setup', 'configure', 'repair', 'maintenance'];

const RequestForm = () => {
	const { type } = useParams();
	const [openPopup, setOpenPopup] = useState(false);
	const [ticketNo, setTicketNo] = useState('');
	const [reqType, setReqType] = useState('');
	const [reqId, setReqId] = useState('');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [successMessage, setSuccessMessage] = useState();
	const [errorMessage, setErrorMessage] = useState();
	const fetchContext = useContext(FetchContext);
	const [loading, setLoading] = useState(false);

	const handleClose = () => {
		setOpenPopup(false);
	};

	const submitRequest = async (values, resetForm) => {
		try {
			setLoading(true);
			const { data } = await fetchContext.authAxios.post(`/request`, values);
			setSuccessMessage(data.message);
			setTicketNo(data.ticketNo);
			setReqType(data.reqType);
			setReqId(data._id);
			setSuccess(true);
			setErrorMessage('');
			resetForm(true);
			setLoading(false);
			if (data?.ticketNo) {
				setOpenPopup(true);
			}

			// const response = await
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
			<Header />
			<Container sx={{ marginBottom: 5 }}>
				<Formik
					initialValues={{
						title: type,
						reqType: '',
						description: '',
					}}
					validationSchema={requestSchema}
					onSubmit={(values, { resetForm }) => {
						submitRequest(values, resetForm);
						// console.log(values);
					}}
				>
					{(values) => {
						return (
							<Form>
								<Box sx={{ marginTop: 5 }}>
									<Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
										You are requesting for
									</Typography>
									<Paper
										sx={{
											marginTop: 3,
											p: 3,
											display: 'flex',
											alignItems: 'center',
											gap: 2,
											justifyContent: 'space-between',
										}}
										elevation={8}
									>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 2,
											}}
										>
											<Avatar
												sx={{
													width: 60,
													height: 60,
													backgroundColor: 'transparent',
													border: 1,
													borderColor: '#192a56',
													color: '#192a56',
												}}
											>
												{type === 'data' && (
													<StorageIcon sx={{ fontSize: 40 }} />
												)}
												{type === 'software' && (
													<AlbumIcon sx={{ fontSize: 40 }} />
												)}
												{type === 'hardware' && (
													<MemoryIcon sx={{ fontSize: 40 }} />
												)}
												{type === 'network' && (
													<LanguageIcon sx={{ fontSize: 40 }} />
												)}
												{type === 'others' && (
													<MoreVertIcon sx={{ fontSize: 40 }} />
												)}
											</Avatar>
											<Typography variant="h6" component="p">
												{type}
											</Typography>
										</Box>
										<Box>
											<Link
												to="/home"
												style={{ color: 'inherit', textDecoration: 'none' }}
											>
												<CustomButton color="secondary" variant="contained">
													Change Request
												</CustomButton>
											</Link>
										</Box>
									</Paper>

									<Container sx={{ marginTop: 4 }}>
										{type !== 'others' && (
											<Field name="reqType">
												{({ field, form, meta }) => {
													return (
														<RadioGroupFormik form={form} field={field}>
															{type === 'data' &&
																dataOptions.map((option) => (
																	<FormControlLabel
																		key={option}
																		value={option}
																		control={<Radio />}
																		label={option}
																	/>
																))}
															{type === 'hardware' &&
																hardwareOptions.map((option) => (
																	<FormControlLabel
																		key={option}
																		value={option}
																		control={<Radio />}
																		label={option}
																	/>
																))}
															{type === 'software' &&
																softwareOptions.map((option) => (
																	<FormControlLabel
																		key={option}
																		value={option}
																		control={<Radio />}
																		label={option}
																	/>
																))}
															{type === 'network' &&
																networkOptions.map((option) => (
																	<FormControlLabel
																		key={option}
																		value={option}
																		control={<Radio />}
																		label={option}
																	/>
																))}
														</RadioGroupFormik>
													);
												}}
											</Field>
										)}
										{type === 'others' && (
											<FormControl fullWidth>
												<InputField
													margin="dense"
													required
													fullWidth
													id="firstName"
													label="Please specify..."
													name="reqType"
													autoComplete="off"
													type="text"
													onKeyPress={(evt) => {
														const alpha = /^[a-zA-Z\s]*$/;
														evt.key.replace(alpha, '') && evt.preventDefault();
													}}
												/>
											</FormControl>
										)}
									</Container>
									{values.values.reqType === 'social media content' && (
										<Box>
											<Typography
												variant="subtitle1"
												component="p"
												sx={{ marginTop: 2 }}
											>
												Content Information
											</Typography>
											<Box sx={{ marginTop: 2 }}>
												<Button variant="contained">
													<a
														target="_blank"
														rel="noreferrer"
														href="https://bit.ly/MISRequestForm"
														style={{ color: 'inherit', textDecoration: 'none' }}
													>
														Download Info Request Form
													</a>
												</Button>
											</Box>
											<Alert severity="info" sx={{ marginTop: 2 }}>
												<Typography variant="subtitle2" component="p">
													Kindly donwload this form for posting and have it
													signed by the person/s involved/mentioned in the
													signatures. This form is required for the Approval of
													the Request.
												</Typography>
											</Alert>
										</Box>
									)}
									<Typography
										variant="subtitle1"
										component="p"
										sx={{ marginTop: 2 }}
									>
										Issue Description
									</Typography>
									<InputField
										multiline
										fullWidth
										rows={5}
										sx={{ marginTop: 1.5 }}
										name="description"
										onKeyPress={(evt) => {
											const alpha = /^[a-zA-Z\s]*$/;
											evt.key.replace(alpha, '') && evt.preventDefault();
										}}
									/>
									<Box sx={{ marginTop: 5 }}>
										<CustomButton
											variant="contained"
											type="submit"
											disabled={loading === true}
											startIcon={
												loading === true ? (
													<CircularProgress size={20} color="primary" />
												) : null
											}
										>
											Send Request
										</CustomButton>
									</Box>
								</Box>
							</Form>
						);
					}}
				</Formik>
			</Container>
			<PopupDialog openPopup={openPopup} handleClose={handleClose}>
				<Ticket
					handleClose={handleClose}
					ticketNo={ticketNo}
					reqType={reqType}
					id={reqId}
				/>
			</PopupDialog>
		</>
	);
};

export default RequestForm;
