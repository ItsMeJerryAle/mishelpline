import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
	const [refreshKey, setRefreshKey] = useState(0);
	const history = useNavigate();
	const authContext = useContext(AuthContext);
	
	const authAxios = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
	});

	authAxios.interceptors.response.use(null, async (error) => {
		if (error.response.status === 401) {
			try {
				await authAxios.get('/logout');
				authContext.logout();
				history('/', { replace: true });
			} catch (error) {
				console.log(error?.response?.message);
			}
		}
		if (error.response.status === 403) {
			try {
				await authAxios.get('/logout');
				authContext.logout();
				history('/', { replace: true });
			} catch (error) {
				console.log(error?.response?.message);
			}
		}

		return error;
	});

	const resetKey = () => {
		setInterval(setRefreshKey(refreshKey + 1), 500);
		setInterval(setRefreshKey(0), 10000);
	};

	useEffect(() => {
		resetKey();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Provider
			value={{
				authAxios,
				setRefreshKey,
				refreshKey,
			}}
		>
			{children}
		</Provider>
	);
};

export { FetchContext, FetchProvider };
