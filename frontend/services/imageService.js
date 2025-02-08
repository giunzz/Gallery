import axios from 'axios';

const uploadImage = async (imageUri) => {
    const formData = new FormData();
    formData.append('file', {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
    });

    const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
    return response.data;
};

export { uploadImage };