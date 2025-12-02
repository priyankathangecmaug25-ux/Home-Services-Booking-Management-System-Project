
import axios from 'axios';
import { getAuthHeader } from './TokenService';
import { SERVICE_ENDPOINTS, PAYMENT_ENDPOINTS, BOOKING_ENDPOINTS, FEEDBACK_ENDPOINTS } from '../constants/APIConstant';

// Create a single Axios instance
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach auth headers automatically
axiosInstance.interceptors.request.use((config) => {
    const authHeader = getAuthHeader();
    if (authHeader) {
        config.headers = { ...config.headers, ...authHeader };
    }
    return config;
}, (error) => Promise.reject(error));

/* -------------------- SERVICES -------------------- */
export const getAllServices = () => axiosInstance.get(SERVICE_ENDPOINTS.GET_ALL);
export const getServiceById = (id) => axiosInstance.get(SERVICE_ENDPOINTS.GET_BY_ID(id));
export const getServiceByCategory = (category) => axiosInstance.get(SERVICE_ENDPOINTS.GET_BY_CATEGORY(category));
export const saveService = (data) => axiosInstance.post(SERVICE_ENDPOINTS.ADD, data);
export const updateService = (id, data) => axiosInstance.put(SERVICE_ENDPOINTS.UPDATE(id), data);
export const deleteService = (id) => axiosInstance.delete(SERVICE_ENDPOINTS.DELETE(id));

/* -------------------- PAYMENTS -------------------- */
export const postPayment = (data) => axiosInstance.post(PAYMENT_ENDPOINTS.CREATE, data);
export const getPayment = (id) => axiosInstance.get(PAYMENT_ENDPOINTS.GET(id));

/* -------------------- BOOKINGS -------------------- */
export const createBooking = (data) => axiosInstance.post(BOOKING_ENDPOINTS.ADD, data);

/* -------------------- FEEDBACK -------------------- */
export const postFeedback = (data) => axiosInstance.post(FEEDBACK_ENDPOINTS.CREATE, data);
export const getFeedbackByService = (id) => axiosInstance.get(FEEDBACK_ENDPOINTS.GET_BY_SERVICE(id));
