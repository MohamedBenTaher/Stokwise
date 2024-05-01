import axios from 'axios';

// Create a custom instance
export const http = axios.create({
	baseURL: 'http://localhost:8080', // replace with your base URL
	withCredentials: true, // this will enable cookies
});
