import axios from 'axios';

const API_URL = 'http://54.169.208.148/auth/request-token';

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};