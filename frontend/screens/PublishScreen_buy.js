import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PublishScreen = ({ route, navigation }) => {
    const { artwork } = route.params;  // Get the artwork object passed from ArtworkDetailScreen
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Handle plan selection
    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    // Handle navigation to Checkout
    const handleTryFreePress = () => {
        if (selectedPlan) {
            // Navigate to Checkout and pass the selected plan and artwork data
            navigation.push('CheckoutScreen', {
                artwork: artwork,
                plan: selectedPlan,
            });
        } else {
            // Optional: Display an alert if no plan was selected
            alert('Please select a plan first');
        }
    };

    return (
        <View style={styles.container}>
            {/* Artwork Image */}
            <Image 
                source={artwork.image} // Use the image passed from ArtworkDetailScreen
                style={styles.artworkImage}
                resizeMode="contain"
            />

            {/* Pricing Options */}
            <View style={styles.pricingContainer}>
                {/* Monthly Plan */}
                <TouchableOpacity 
                    style={[
                        styles.card, 
                        selectedPlan === 'monthly' && styles.selectedCard
                    ]}
                    onPress={() => handlePlanSelect('monthly')}
                >
                    <Text style={styles.price}>$9.99</Text>
                    <Text style={styles.billing}>/month</Text>
                    <Text style={styles.billing}>Billed monthly</Text>
                </TouchableOpacity>

                {/* Yearly Plan */}
                <TouchableOpacity 
                    style={[
                        styles.card, 
                        selectedPlan === 'yearly' && styles.selectedCard
                    ]}
                    onPress={() => handlePlanSelect('yearly')}
                >
                    <Text style={styles.price}>$4.17</Text>
                    <Text style={styles.billing}>/month</Text>
                    <Text style={styles.yearly}>Billed yearly</Text>
                    <Text style={styles.discount}>56% off</Text>
                </TouchableOpacity>
            </View>

            {/* Call to Action Button */}
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleTryFreePress}  
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        elevation: 3,
        width: '48%',
    },

    selectedCard: {
        borderWidth: 2,
        borderColor: '#79D7BE',
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    billing: {
        fontSize: 16,
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
