import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'; 

const UploadPicture = () => {
    const [imageUri, setImageUri] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Permission Denied',
                'Sorry, we need camera roll permission to upload images.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, 
            allowsEditing: true,
            aspect: [4, 3], 
            quality: 1, 
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri); 
        } else {
            Alert.alert('Image selection canceled');
        }
    };

    const uploadImage = async () => {
        if (!imageUri) {
            Alert.alert('No image selected', 'Please select an image before uploading.');
            return;
        }
    
        const formData = new FormData(); 
        formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg', 
            name: 'photo.jpg', 
        });
    
        try {
            const response = await axios.post('http://54.169.208.148/picture/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                    'Authorization': 'Bearer YOUR_API_TOKEN', 
                },
            });
            console.log('Image uploaded successfully:', response.data);
            Alert.alert('Success', 'Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Picture</Text>
            <View style={styles.imageContainer}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <Text style={styles.placeholderText}>No image selected</Text>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, !imageUri && styles.disabledButton]} 
                onPress={uploadImage} 
                disabled={!imageUri}
            >
                <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Upload Your Pictures Easily</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9', // Light background color
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Dark text color
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
        backgroundColor: '#eaeaea', // Light gray background for image container
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderText: {
        color: '#777',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4DA1A9', 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff', 
        fontSize: 18,
    },
    disabledButton: {
        backgroundColor: '#ccc', 
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#79D7BE", 
        paddingVertical: 10,
        alignItems: "center",
    },
    footerText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default UploadPicture;