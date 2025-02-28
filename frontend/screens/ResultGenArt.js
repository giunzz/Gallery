import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { GenerateLineArt, addPicture, getToken } from '../services/apiService';

const ResultGenArt = ({ route, navigation }) => {
    const { prompt = '' } = route.params || {};

    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    // ✅ Function to fetch generated art, ensuring no direct state updates during render
    const fetchGeneratedArt = async () => {
        setLoading(true);
        try {
            const response = await GenerateLineArt(prompt); // Call API
            console.log("Generated Art Response:", response); // Debugging output
    
            if (response && response.url) {
                setImageUrl(response.url); 
            } else {
                console.warn("Invalid response structure:", response);
                Alert.alert("Error", "Failed to fetch generated artwork.");
            }
        } catch (error) {
            console.error("Error generating artwork:", error);
            Alert.alert("Error", error.message || "Failed to generate artwork. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchGeneratedArt();
    }, []);

    const saveToLibrary = async () => {
        if (!imageUrl) {
            Alert.alert("Error", "No image to save.");
            return;
        }
    
        setUploading(true);
        try {
            const token = await getToken();
            if (!token) {
                Alert.alert("Error", "Authentication required. Please log in again.");
                setUploading(false);
                return;
            }
    
            // ✅ Try getting existing images, and handle potential errors
            let existingImages = [];
            try {
                existingImages = await getUserPicture(token);
            } catch (error) {
                console.error("Error fetching existing images:", error);
            }
    
            // ✅ Check if the image already exists before uploading
            const isDuplicate = existingImages.some(img => img.url === imageUrl);
            if (isDuplicate) {
                Alert.alert("Notice", "This image is already in your library.", [
                    { text: "OK", onPress: () => navigation.navigate("Library") }
                ]);
                setUploading(false);
                return;
            }
    
            // ✅ Proceed with upload if it's a new image
            const uploadResponse = await addPicture(imageUrl, token);
            if (uploadResponse && uploadResponse.success) {
                Alert.alert("Success", "Image saved to your library.", [
                    { text: "OK", onPress: () => navigation.navigate('MainTabs', { screen: 'Library' }) }
                ]);
            } else {
                Alert.alert("Error", "Failed to save image.", [
                    { text: "OK", onPress: () => navigation.navigate('MainTabs', { screen: 'Library' }) }
                ]);
            }
        } catch (error) {
            console.error("Error saving image:", error);
            Alert.alert("Error", "Error saving image. Please try again.", [
                { text: "OK", onPress: () => navigation.navigate('MainTabs', { screen: 'Library' }) }
            ]);
        } finally {
            setUploading(false);
        }
    };
    

    const handleButtonPress = (buttonName) => {
        setActiveButton(buttonName);
        if (buttonName === 'Library') {
            saveToLibrary();
        } else if (buttonName === 'Draw') {
            navigation.navigate('Draw');
        } else if (buttonName === 'Explore') {
            navigation.navigate('MainTabs', { screen: 'Explore' }); // ✅ Navigate inside the Main Tab
        }
    };    
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("GenerateArtScreen", { prompt })}>
                    <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            ),
            title: "Generated Art",
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.frameContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#4DA1A9" />
                ) : imageUrl ? (
                    <Image 
                        source={{ uri: imageUrl }} 
                        style={styles.artImage} 
                        resizeMode="contain"
                    />
                ) : (
                    <Text>No image generated</Text>
                )}
            </View>

            <Text style={styles.details}>Prompt</Text>
            <TextInput 
                style={styles.input}
                placeholder="Please Describe Your Desired Artwork Here"
                placeholderTextColor="#A9A9A9"
                value={prompt}
                editable={false} 
            />

            {/* Buttons with Active Color Change */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'Library' && styles.activeButton]} 
                    onPress={() => handleButtonPress('Library')}
                    disabled={uploading}
                >
                    <Text style={styles.buttonText}>{uploading ? "Saving..." : "Save to Library"}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, activeButton === 'Draw' && styles.activeButton]} 
                    onPress={() => handleButtonPress('Draw')}
                >
                    <Text style={styles.buttonText}>Draw</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, activeButton === 'Explore' && styles.activeButton]} 
                    onPress={() => handleButtonPress('Explore')}
                >
                    <Text style={styles.buttonText}>Explore</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 20,
    },
    frameContainer: {
        width: '100%',
        height: 300,
        borderWidth: 3,
        borderColor: '#4DA1A9',  
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    artImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    details: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
        textAlign: 'left',  
        width: '100%', 
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#4DA1A9',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#8888',  
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    activeButton: {
        backgroundColor: '#4DA1A9',  
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default ResultGenArt;
