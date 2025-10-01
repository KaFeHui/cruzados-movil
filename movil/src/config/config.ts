import axios from 'axios';
import { serverUrl } from './env';

console.log('Backend URL:', serverUrl);
const api = axios.create({
    baseURL: serverUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

export default api;
