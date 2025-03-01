import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'http://13.250.12.56/auth/request-token';
const API_URL1 = 'http://13.250.12.56/auth/login-address';
const API_AddPic = 'http://13.250.12.56/picture/add';

export const getMessageFromServer = async (address) => {
    try {
        const response = await axios.post(API_URL, { address }, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data.message; 
    } catch (error) {
        console.error("Error fetching message from server:", error.response ? error.response.data : error);
        throw error;
    }
};

export const getAuthorizationToken = async (address, message, signature) => {
    try {
        const response = await axios.post(API_URL1, { address, message, signature });

        const token = response.data.token;
        if (token) {
            await AsyncStorage.setItem("token", token);
            console.log("Token stored successfully:", token);
        }

        return token;
    } catch (error) {
        console.error("Error fetching authorization token:", error.response ? error.response.data : error);
        throw error;
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        console.log("Retrieved Token:", token);
        return token;
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
    }
};

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
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Picture uploaded successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding picture:", error.response ? error.response.data : error);
        throw error;
    }
};

export const getUserPicture = async (token) => {
    try {
        const response = await axios.get('http://13.250.12.56/user/pictures', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data; 
    } catch (error) {
        console.error('Error fetching user picture:', error.response ? error.response.data : error);
        throw new Error('Failed to fetch user picture');
    }
};

export const NewsExplore = async (token) => {
    try {
        const response = await axios.get('http://13.250.12.56/user/news', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data; 
    } catch (error) {
        console.error('Error fetching news:', error.response ? error.response.data : error);
        throw new Error('Failed to fetch news');
    }
};

export const GenerateLineArt = async (prompt) => {
    try {
        const response = await axios.post('http://13.250.12.56/ai/art', {
            prompt: prompt || "Default prompt",  // Ensures input is always valid
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        return response.data; 
    } catch (error) {
        console.error('Error generating picture:', error.response?.data || error);
        throw new Error(error.response?.data?.error || "Failed to generate picture.");
    }
};
