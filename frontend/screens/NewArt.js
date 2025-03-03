import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getUserPicture, getToken } from '../services/apiService'; 

const ArtDetail = ({ navigation }) => { 
    const [userPicture, setUserPicture] = useState(null);
    const [artworkTitle, setArtworkTitle] = useState(''); 
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userToken = await getToken();
                setToken(userToken);

                const pictureData = await getUserPicture(userToken);
                //console.log(pictureData);
                if (pictureData && pictureData.pictures && pictureData.pictures.length > 0) {
                    const pictureUrl = pictureData.pictures[0].url;
                    setArtworkTitle(pictureData.pictures[0].address); // Update the title here
                    setUserPicture(pictureUrl);
                } else {
                    setError("No pictures found.");
                }
            } catch (err) {
                setError("Failed to load user picture or token");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDownload = () => {
        Alert.alert("Download", "Download functionality to be implemented.");
    };

    const handleShare = () => {
        Alert.alert("Share", "Share functionality to be implemented.");
    };

    const handleListen = () => {
        // Navigate to MusicArt screen and pass the picture URL
        navigation.navigate("MusicArt", { pictureUrl: userPicture });
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            {userPicture ? (
                <Image source={{ uri: userPicture }} style={styles.image} />
            ) : (
                <Text style={styles.placeholderText}>No image available</Text>
            )}
            <Text style={styles.title}>{artworkTitle}</Text>

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
        fontSize: 24,
        fontWeight: 'bold',
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
