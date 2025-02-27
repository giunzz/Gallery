import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // ✅ Import Ionicons

const ArtworkDetailScreen = ({ route, navigation }) => {
    const { artwork } = route.params;
    const [isDrawPressed, setIsDrawPressed] = useState(false);
    const [isOwnershipPressed, setIsOwnershipPressed] = useState(false);
    const [isPublishPressed, setIsPublishPressed] = useState(false);

    // Correctly navigate to PublishScreen_buy with the artwork object
    const handlePublishPress = () => {
        navigation.navigate('PublishArtwork', { artwork: artwork });
    };

    const handleOwnerPress = () => {
        navigation.navigate('Ownership', { artwork: artwork }); // This is correct
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Artwork Details */}
            <View style={styles.detailsContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                
                <Image source={{ uri: artwork.url }} style={styles.image} />

                <Text style={styles.title}>Token: {artwork.token}</Text>
                <Text style={styles.subtext}>Address: {artwork.address}</Text>
                <Text style={styles.subtext}>Visibility: {artwork.visibility}</Text>
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.drawButton, isDrawPressed && styles.buttonPressed]} 
                    onPressIn={() => setIsDrawPressed(true)}
                    onPressOut={() => setIsDrawPressed(false)}
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
                    <Text style={styles.buttonText}>Publish</Text>
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
