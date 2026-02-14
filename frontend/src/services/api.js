import axios from 'axios';
import { BACKEND_CONFIG } from './apiConfig';

const api = axios.create({
    baseURL: BACKEND_CONFIG.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const analyzeFood = async (data) => {
    try {
        const response = await api.post('/analyze', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { success: false, message: 'Network Error' };
    }
};

export const getHistory = async () => {
    try {
        const response = await api.get('/history');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { success: false, message: 'Network Error' };
    }
};

export default api;
