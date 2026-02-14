import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
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
