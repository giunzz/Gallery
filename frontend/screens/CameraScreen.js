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
    SafeAreaView, 
    FlatList 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SearchOwner } from '../services/apiService'; 

const SearchOwnership = () => {
    const [imageUri, setImageUri] = useState(null);
    const [searchResults, setSearchResults] = useState([]); 
    const [loading, setLoading] = useState(false);

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

    const Search = async () => {
        if (!imageUri) {
            Alert.alert('No image selected', 'Please select an image before searching.');
            return;
        }

        setLoading(true);
        try {
            const result = await SearchOwner(imageUri);

            if (result && Array.isArray(result.pictures)) {
                setSearchResults(result.pictures);
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
                {/* Title */}
                <Text style={styles.title}></Text>

                {/* Selected Image */}
                <View style={styles.imageContainer}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <Text style={styles.placeholderText}>No image selected</Text>
                    )}
                </View>

                {/* Buttons in Row */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Pick an image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, !imageUri && styles.disabledButton]} 
                        onPress={Search} 
                        disabled={!imageUri}
                    >
                        <Text style={styles.buttonText}>Search </Text>
                    </TouchableOpacity>
                </View>

                {loading && <ActivityIndicator size="large" color="#146C43" style={styles.loadingIndicator} />}

                {/* Search Results Grid */}
                {searchResults.length > 0 && (
                    <View style={styles.resultsContainer}>
                        <Text style={styles.resultsTitle}>Result :</Text>
                        <FlatList
                            data={searchResults}
                            numColumns={2} // Display images in a 2-column grid
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.artContainer}>
                                    <Image source={{ uri: item.url }} style={styles.artImage} />
                                    <Text style={styles.tokenText}>Token: {item.token.slice(0, 2)}...</Text> {/* Display first 2 characters of the token */}
                                </View>
                            )}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',    
    },
    scrollView: {
        alignItems: 'center',
        width: '100%',
        paddingVertical: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2D2D2D',
        marginBottom: 15,
    },
    imageContainer: {
        width: '90%',
        height: 200,
        borderRadius: 15,
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 2,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderText: {
        color: '#777',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 80,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 15,
    },
    button: {
        backgroundColor: '#79D7BE',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '45%', 
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    loadingIndicator: {
        marginTop: 20,
    },
    resultsContainer: {
        width: '90%',
        marginTop: 20,
    },
    resultsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D2D2D',
        marginBottom: 10,
    },
    artContainer: {
        width: '45%', // Set to 45% for 2-column layout
        margin: '2.5%', // Add margin for spacing
        aspectRatio: 1, // Keep square aspect ratio
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#ccc',
        position: 'relative',
    },
    artImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    tokenText: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
});

export default SearchOwnership;