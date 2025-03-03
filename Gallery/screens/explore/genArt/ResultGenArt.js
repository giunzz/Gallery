import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back button
import img from "../assets/genart/genart.png"; // Path to the image file

const ResultGenArt = ({ route, navigation }) => {
    // Destructure with default values to avoid undefined errors
    const { prompt = '', selectedCanvas = null } = route.params || {};

    const [activeButton, setActiveButton] = useState(null); // Track the active button

    const handleButtonPress = (buttonName) => {
        setActiveButton(buttonName); 
        if (buttonName === 'Library') {
            navigation.navigate('Library'); 
        } else if (buttonName === 'Publish') {
            navigation.navigate('Publish_buy'); 
        }
    };

    // Set up the navigation header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("GenerateArtScreen", { prompt, selectedCanvas })}>
                    <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            ),
            title: "Generated Art",
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.frameContainer}>
                <Image 
                    source={img} 
                    style={styles.artImage} 
                    resizeMode="contain"
                />
            </View>

            {/* Prompt Text with Left Justify */}
            <Text style={styles.details}>Prompt</Text>
            {/* Text Input for Prompt */}
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
                    style={[styles.button, activeButton === 'Draw' && styles.activeButton]} 
                    onPress={() => handleButtonPress('Draw')}>
                    <Text style={styles.buttonText}>Draw</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'Library' && styles.activeButton]} 
                    onPress={() => handleButtonPress('Library')}>
                    <Text style={styles.buttonText}>Library</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'Publish' && styles.activeButton]} 
                    onPress={() => handleButtonPress('Publish')}>
                    <Text style={styles.buttonText}>Publish</Text>
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
        bottom: 20,
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
        bottom: 10
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