// axiosConfig.ts
import axios from 'axios';
import { API_BASE_URL, API_BASE_URL_AUTH } from './apiConfig';
import { AppContants } from '@/contants/appContants';

const apiInstanceWithAuth = axios.create({
    baseURL: API_BASE_URL,
});

const apiInstanceWithoutAuth = axios.create({
    baseURL: API_BASE_URL_AUTH,
});

// Request Interceptor

apiInstanceWithAuth.interceptors.request.use((config) => {
    // Retrieve the token from local storage or your state management
    const token = localStorage.getItem(AppContants.AUTH_TOKEN) || null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor
apiInstanceWithAuth.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export { apiInstanceWithoutAuth, apiInstanceWithAuth };

