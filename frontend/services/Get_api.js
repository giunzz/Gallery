import axios from 'axios';
import getto
export const getUserPicture = async (token) => {
    try {
        const response = await axios.get('http://54.169.208.148/user/pictures', {
            headers: {
                Authorization: `Bearer ${token}`, // Using the token for authentication
            }
        });

        return response.data; // Return the picture data or URL as per your API's response
    } catch (error) {
        console.error('Error fetching user picture:', error);
        throw new Error('Failed to fetch user picture');
    }
};
