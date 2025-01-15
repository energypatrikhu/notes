import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.DEV ? `http://localhost:5173/api` : '/api',
});

export { api };
