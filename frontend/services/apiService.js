import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'http://54.169.208.148/auth/request-token';
const API_URL1 = 'http://54.169.208.148/auth/login-address';
const API_AddPic = 'http://54.169.208.148/picture/add';

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
        const response = await axios.post(API_URL1, {
            address,
            message,
            signature,
        });

        const token = response.data.token;

        if (token) {
            await AsyncStorage.setItem("token", token);  // Ensure token is stored
            console.log("Token stored successfully:", token);
        }

        return token;
    } catch (error) {
        console.error("Error fetching authorization token", error);
        throw error;
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        console.log("Retrieved Token:", token); // Debugging token retrieval
        return token;
    } catch (error) {
        console.error("Error retrieving token", error);
        return null;
    }
};

// Image upload function
export const addPicture = async (imageUri, token) => {
    if (!token) {
        console.error("Authorization token is missing");
        throw new Error("Authorization token is missing");
    }

    const formData = new FormData();
    formData.append('picture', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
    });

    try {
        const response = await axios.post(API_AddPic, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Ensure correct content type
            },
        });
        console.log('Picture uploaded successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding picture", error.response ? error.response.data : error);
        throw error;
    }
};

export const getUserPicture = async (token) => {
    try {
        const response = await axios.get('http://54.169.208.148/user/pictures', {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        });

        return response.data; 
    } catch (error) {
        console.error('Error fetching user picture:', error);
        throw new Error('Failed to fetch user picture');
    }
};

export const NewsExpore = async (token) => {
    try {
        const response = await axios.get('http://54.169.208.148/user/news', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data; 
    } catch (error) {
        console.error('Error fetching picture:', error);
        throw new Error('Failed to fetch picture');
    }
};