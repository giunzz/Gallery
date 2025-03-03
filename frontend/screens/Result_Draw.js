import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ArtDetail = ({ navigation, route }) => {  
    const { item = {} } = route.params || {};  // ✅ Prevents crashes if route.params is undefined
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!item || Object.keys(item).length === 0) {
            setError("No item data available.");
        } else {
            setLoading(false);
        }
    }, [item]);

    const handleDownload = () => {
        Alert.alert("Download", "Download functionality to be implemented.");
    };

    const handleShare = () => {
        Alert.alert("Share", "Share functionality to be implemented.");
    };

    const handleListen = () => {
        navigation.navigate("MusicArt", { item });
    };

    console.log("Received item:", item);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            {item.url ? (
                <Image source={{ uri: item.url }} style={styles.image} /> 
            ) : (
                <Text style={styles.placeholderText}>No image available</Text>
            )}
            <Text style={styles.title}>Token: {item.token || "No Token Available"}</Text> 

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDownload}>
                    <Text style={styles.buttonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleShare}>
                    <Text style={styles.buttonText}>Share</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.listenButton} onPress={handleListen}>
                <Text style={styles.listenButtonText}>Listen to the art</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E0FFFF',
        padding: 20,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
    },
    placeholderText: {
        fontSize: 16,
        color: '#777',
        marginTop: 20,
    },
    title: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#79D7BE',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    listenButton: {
        backgroundColor: '#4DA1A9',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    listenButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default ArtDetail;
