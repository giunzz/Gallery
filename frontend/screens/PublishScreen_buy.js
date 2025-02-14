import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { LibraryContext } from './LibraryContext'; // Import the context to manage library items
import { CommonActions } from '@react-navigation/native'; // Import CommonActions

const PublishScreen = ({ route, navigation }) => {
    const { artwork } = route.params;  
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [price, setPrice] = useState(artwork.price || ''); 
    const [username, setUsername] = useState('Jane'); 
    const { addItemToLibrary } = useContext(LibraryContext); 

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handleTryFreePress = () => {
        if (selectedPlan) {
            // Add the artwork with the modified price and username to your library context
            const artworkWithDetails = {
                ...artwork,
                price: price || '0 VND', // Use the entered price or default to 0
                username: username, // Add username
            };
            addItemToLibrary(artworkWithDetails); 

            // Show success alert
            Alert.alert("Success", "Artwork has been successfully published!", [
                {
                    text: "OK",
                    onPress: () => {
                        // Reset the navigation state and navigate to Market
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Market' }],
                            })
                        );
                    }
                }
            ]);
        } else {
            Alert.alert('Warning', 'Please select a plan first');
        }
    };

    return (
        <View style={styles.container}>
            {/* Artwork Image */}
            <Image 
                source={artwork.image}  // Use the artwork image passed from ArtworkDetailScreen
                style={styles.artworkImage}
                resizeMode="contain"
            />

            {/* Editable Price Input */}
            <TextInput
                style={styles.priceInput}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price in VND"
                keyboardType="numeric" 
            />

            {/* Pricing Options */}
            <View style={styles.pricingContainer}>
                {/* Monthly Plan */}
                <TouchableOpacity 
                    style={[styles.card, selectedPlan === 'monthly' && styles.selectedCard]}
                    onPress={() => handlePlanSelect('monthly')}
                >
                    <Text style={styles.price}>50.000 VND</Text>
                    <Text style={styles.billing}>/month</Text>
                    <Text style={styles.billing}>Normal customers</Text>
                </TouchableOpacity>

                {/* Yearly Plan */}
                <TouchableOpacity 
                    style={[styles.card, selectedPlan === 'yearly' && styles.selectedCard]}
                    onPress={() => handlePlanSelect('yearly')}
                >
                    <Text style={styles.price}>100.000 VND</Text>
                    <Text style={styles.billing}>/month</Text>
                    <Text style={styles.yearly}>Premium</Text>
                    <Text style={styles.discount}>56% off</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={styles.button} 
                onPress={handleTryFreePress}  // Handle the button press
            >
                <Text style={styles.buttonText}>Try free for 7 days</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    artworkImage: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    },
    priceInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 20,
    },
    pricingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        elevation: 3,
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: '#79D7BE',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    billing: {
        fontSize: 14,
    },
    yearly: {
        fontSize: 12,
        color: '#666',
    },
    discount: {
        fontSize: 16,
        color: '#FF5722',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#79D7BE',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PublishScreen;
