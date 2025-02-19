import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NoResultsScreen = () => {
    const navigation = useNavigation();

    const handleSearchAgain = () => {
        navigation.goBack(); // Navigate back or to a search screen
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/404.png')} // Replace with your image path
                style={styles.image} 
                resizeMode="contain" 
            />
            <Text style={styles.title}>No Results Found</Text>
            <Text style={styles.message}>
                We couldn't find what you searched for. 
                {'\n'}Try searching again.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleSearchAgain}>
                <Text style={styles.buttonText}>Search Again</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0f4e5', // Light background color
        padding: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2d6a4f', // Dark green for title
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: '#4a4a4a', // Gray for message
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2d6a4f', // Dark green for button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff', // White text for button
        fontSize: 16,
    },
});

export default NoResultsScreen;