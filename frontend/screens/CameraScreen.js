import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    StyleSheet, 
    Alert, 
    ScrollView, 
    ActivityIndicator, 
    SafeAreaView  // ✅ Add this import
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SearchOwner } from '../services/apiService'; // Import correct API function


const CameraScreen = () => {
    const [imageUri, setImageUri] = useState(null);
    const [searchResults, setSearchResults] = useState([]); // Store search results (artworks)
    const [loading, setLoading] = useState(false); // Loading state

    // Function to pick an image from the gallery
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
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
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

    // Function to search for ownership using the selected image
    const Search = async () => {
        if (!imageUri) {
            Alert.alert('No image selected', 'Please select an image before searching.');
            return;
        }

        setLoading(true);
        try {
            const result = await SearchOwner(imageUri);
            console.log('Search Results:', result);
            
            if (result && result.artworks) {
                setSearchResults(result.artworks); // Assuming API response contains an `artworks` array
            } else {
                setSearchResults([]);
                Alert.alert("No results found", "No ownership data was found for the selected image.");
            }
        } catch (error) {
            console.error("Error searching ownership:", error);
            Alert.alert("Error", "Failed to fetch ownership data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Search Artwork Ownership</Text>
                
                <View style={styles.imageContainer}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <Text style={styles.placeholderText}>No image selected</Text>
                    )}
                </View>

                {/* Pick Image Button */}
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Pick an Image</Text>
                </TouchableOpacity>

                {/* Search Button */}
                <TouchableOpacity 
                    style={[styles.button, !imageUri && styles.disabledButton]} 
                    onPress={Search} 
                    disabled={!imageUri}
                >
                    <Text style={styles.buttonText}>Search Ownership</Text>
                </TouchableOpacity>

                {/* Loading Indicator */}
                {loading && <ActivityIndicator size="large" color="#4DA1A9" style={styles.loadingIndicator} />}

                {/* Display Search Results */}
                {searchResults.length > 0 && (
                    <View style={styles.resultsContainer}>
                        <Text style={styles.resultsTitle}>Similar Artworks:</Text>
                        {searchResults.map((art, index) => (
                            <View key={index} style={styles.artContainer}>
                                <Image source={{ uri: art.imageUrl }} style={styles.artImage} />
                                <Text style={styles.artTitle}>{art.title || 'Untitled'}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Artwork Ownership Finder</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    scrollView: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
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
        backgroundColor: '#eaeaea',
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
    loadingIndicator: {
        marginTop: 20,
    },
    resultsContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    resultsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    artContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    artImage: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
    artTitle: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
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

export default CameraScreen;
