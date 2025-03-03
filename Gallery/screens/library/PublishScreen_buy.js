import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { LibraryContext } from '../components/LibraryContext'; // Import the context to manage library items
import { CommonActions } from '@react-navigation/native'; // Import CommonActions

const PublishScreen = ({ route, navigation }) => {
    const { artwork } = route.params;  
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [price, setPrice] = useState(artwork.price || ''); 
    const [username, setUsername] = useState('Jane'); 
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility for verification phase
    const [loading, setLoading] = useState(false); // Loading spinner for checking phase
    const [verificationStatus, setVerificationStatus] = useState([]); // To hold the verification status for each item
    const { addItemToLibrary } = useContext(LibraryContext); 

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const verificationItems = [
        { id: 1, title: "Copyright and Ownership Rights", isChecked: null }, 
        { id: 2, title: "Lorem ipsum", isChecked: null },
        { id: 3, title: "Lorem ipsum", isChecked: null },
        { id: 4, title: "Lorem ipsum", isChecked: null },
        { id: 5, title: "Lorem ipsum", isChecked: null }
    ];

    // Start verification process
    const handleVerifyAndPublish = () => {
        setModalVisible(true); // Show the modal during verification
        setLoading(true); // Start loading

        setTimeout(() => {
            const updatedStatus = verificationItems.map((item, index) => ({
                ...item,
                // isChecked: index % 2 === 0 ? 'success' : 'fail',
                isChecked: 'success',
                //isChecked: 'fail',
            }));
            setVerificationStatus(updatedStatus);
            setLoading(false); // Stop loading

            // Check verification results
            if (!updatedStatus.some(item => item.isChecked === 'fail')) {
                const artworkWithDetails = {
                    ...artwork,
                    price: price || '0 VND',
                    username: username,
                };
                addItemToLibrary(artworkWithDetails);

                Alert.alert("Success", "Artwork has been successfully published!", [
                    {
                        text: "OK",
                        onPress: () => {
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
                Alert.alert('Warning', 'There were issues with the artwork verification.');
            }
            setModalVisible(false); // Close the modal
        }, 3000); // Simulate a 3 second verification time
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image 
                source={artwork.image}  
                style={styles.artworkImage}
                resizeMode="contain"
            />

            <Text style={styles.leftAlignedTitle}>Title</Text>
            <TextInput
                style={styles.priceInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter title"
            />

            {/* Price */}
            <Text style={styles.leftAlignedTitle}>Price</Text>
            <TextInput
                style={styles.priceInput}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price in VND"
                keyboardType="numeric" 
            />

            {/* Pricing Options */}
            <View style={styles.pricingContainer}>
                <TouchableOpacity 
                    style={[styles.card, selectedPlan === 'monthly' && styles.selectedCard]}
                    onPress={() => handlePlanSelect('monthly')}
                >
                    <Text style={styles.price}>50.000 VND</Text>
                    <Text style={styles.billing}>/month</Text>
                    <Text style={styles.billing}>Normal customers</Text>
                </TouchableOpacity>

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

            {/* Try Free Button */}
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleVerifyAndPublish} 
            >
                <Text style={styles.buttonText}>Try free for 7 days</Text>
            </TouchableOpacity>

            {/* Modal for Checking */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {loading ? (
                            <View style={styles.modalInnerContent}>
                                <Text style={styles.modalText}>Checking...</Text>
                                <ActivityIndicator size="large" color="#79D7BE" />
                            </View>
                        ) : (
                            <Text style={styles.modalText}>Artwork verification complete!</Text>
                        )}
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    artworkImage: {
        width: '100%',
        height: 200,
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
    leftAlignedTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
        marginBottom: 5,
        color: '#2E5077',
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
    // Modal styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: 250,
        alignItems: 'center',
    },
    modalInnerContent: {
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
});

export default PublishScreen;