import axios from 'axios';

const API_URL = 'https://api.example.com';

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};