import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { Api, RequestParams } from '../models'; // import the generated Api
import useGlobalState from './useGlobalState';

export default function useApi(apiCall) {
	const { accessToken, setAccessToken } = useGlobalState();

	useEffect(() => {
		// Fetch the access token when the component mounts
		const fetchAccessToken = async () => {
			const params: RequestParams = {}; // Fill this with any necessary parameters
			const res = await apiCall({}, params);
			const resData = res.data;
			setAccessToken(resData.accessToken);
		};

		fetchAccessToken();
	}, [apiCall]);

	const apiWithAuth = new Api({
		securityWorker: async () => {
			// Before any call is made, check if the access token is expired, and if it is, get a new access token
			if (accessToken && jwt.decode(accessToken)) {
				const expiry = jwt.decode(accessToken).exp;
				const now = new Date();
				if (now.getTime() > expiry * 1000) {
					const params: RequestParams = {}; // Fill this with any necessary parameters
					const res = await apiCall(params);
					const resData = res.data;
					setAccessToken(resData.accessToken);

					// Kinda like optimistic updating, allows us to make the call without relying on setAccessToken to behave synch
					accessToken = resData.accessToken;
				}
			}

			return {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};
		},
	});

	return apiWithAuth;
}
