import axios from 'axios';

const API_URL = 'http://54.169.208.148/auth/request-token'; 

export const getMessageFromServer = async (address) => {
    try {
        const response = await axios.post(API_URL, { address });
        return response.data.message; 
    } catch (error) {
        console.error("Error fetching message from server", error);
        throw error;
    }
};

export const getAuthorizationToken = async (address, message, signature) => {
    try {
        const response = await axios.post(API_URL, {
            address,
            message,
            signature
        });
        return response.data.token; 
    } catch (error) {
        console.error("Error fetching authorization token", error);
        throw error;
    }
};
