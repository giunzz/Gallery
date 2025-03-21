import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const ArtworkDetailScreen = ({ route, navigation }) => {
    const { artwork } = route.params;
    const [isDrawPressed, setIsDrawPressed] = useState(false);
    const [isOwnershipPressed, setIsOwnershipPressed] = useState(false);
    const [isPublishPressed, setIsPublishPressed] = useState(false);
    const [isMusicPressed, setIsMusicPressed] = useState(false);

    const handlePublishPress = () => {
        navigation.navigate('PublishArtwork', { 
            artwork: { 
                title: artwork.token, 
                artistName: artwork.address, 
                imageUrl: artwork.url, // ✅ Ensure the correct image property
                visibility: artwork.visibility, 
                price: artwork.price || '0 VND' // ✅ Ensure price is sent
            }
        });
    };

    const handleOwnerPress = () => {
        navigation.navigate('Ownership', { 
            artwork: { 
                token: artwork.token, 
                artistName: artwork.address, 
                imageUrl: artwork.url 
            } 
        });
    };
    
    const handleDrawPress = () => {
        navigation.navigate('NewArt', { artwork: artwork.url});
    };

    const handleMusicPress = () => {
        navigation.navigate('MusicArt', { 
            item: { 
                token: artwork.token, 
                artistName: artwork.address, 
                url: artwork.url 
            }  
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Artwork Details */}
            <View style={styles.detailsContainer}>
                
                <Image source={{ uri: artwork.url }} style={styles.image} />

                <Text style={styles.title}>Token: {artwork.token}</Text>
                <Text style={styles.subtext}>Address: {artwork.address}</Text>
                <Text style={styles.subtext}>Visibility: {artwork.visibility}</Text>
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.drawButton, isDrawPressed && styles.buttonPressed]} 
                    onPressIn={() => setIsDrawPressed(true)}
                    onPressOut={() => {
                        setIsDrawPressed(false);
                        handleDrawPress();
                    }}
                >
                <Text style={styles.buttonText}>Draw</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.colorButton, isOwnershipPressed && styles.buttonPressed]} 
                    onPressIn={() => setIsOwnershipPressed(true)}
                    onPressOut={() => {
                        setIsOwnershipPressed(false);
                        handleOwnerPress(); // Call the correct navigation function
                    }}
                >
                    <Text style={styles.buttonText}>Ownership</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.publishButton, isPublishPressed && styles.buttonPressed]} 
                    onPressIn={() => setIsPublishPressed(true)}
                    onPressOut={() => {
                        setIsPublishPressed(false);
                        handlePublishPress();  
                    }}
                >
                    <Text style={styles.buttonText}>Sell Art</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.MusicButton, isMusicPressed && styles.buttonPressed]} 
                    onPressIn={() => setIsMusicPressed(true)}
                    onPressOut={() => {
                        setIsMusicPressed(false);
                        handleMusicPress(); // Call the correct navigation function
                    }}
                >
                    <Text style={styles.buttonText}>MusicArt</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    detailsContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 10,
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginTop: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    subtext: {
        fontSize: 16,
        color: "#666",
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingBottom: 20,
    },
    drawButton: {
        backgroundColor: "#777",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
    },
    colorButton: {
        backgroundColor: "#E76F51",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
    },
    MusicButton: {
        backgroundColor: "#F4A261",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
    },
    publishButton: {
        backgroundColor: "#F4A261",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 14,
    },
    buttonPressed: {
        backgroundColor: "#555",
    },
});

export default ArtworkDetailScreen;
