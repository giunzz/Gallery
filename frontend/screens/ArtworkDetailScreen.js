import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const ArtworkDetailScreen = ({ route, navigation }) => {
    const { artwork } = route.params;
    const [isDrawPressed, setIsDrawPressed] = useState(false);
    const [isColorPressed, setIsColorPressed] = useState(false);
    const [isPublishPressed, setIsPublishPressed] = useState(false);

    // Correctly navigate to PublishScreen_buy with the artwork object
    const handlePublishPress = () => {
        navigation.navigate('Publish_buy', { artwork: artwork });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Artwork Details */}
            <View style={styles.detailsContainer}>
                <Image source={artwork.image} style={styles.artworkImage} />
                <Text style={styles.artworkTitle}>{artwork.title}</Text>
                <Text style={styles.artworkType}>{artwork.type}</Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
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
                    style={[styles.colorButton, isColorPressed && styles.buttonPressed]} 
                    onPressIn={() => setIsColorPressed(true)}
                    onPressOut={() => setIsColorPressed(false)}
                >
                    <Text style={styles.buttonText}>Color</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.publishButton, isPublishPressed && styles.buttonPressed]} 
                    onPressIn={() => setIsPublishPressed(true)}
                    onPressOut={() => {
                        setIsPublishPressed(false);
                        handlePublishPress();  // Correctly navigate to the publish screen
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
    artworkImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 15,
    },
    artworkTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    artworkType: {
        fontSize: 18,
        color: 'gray',
    },
    description: {
        marginTop: 1,
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
        textAlign: 'center', 
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
        fontSize: 16,
    },
    buttonPressed: {
        backgroundColor: "#555",
    },
});

export default ArtworkDetailScreen;
