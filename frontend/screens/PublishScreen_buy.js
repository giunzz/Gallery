import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
    ActivityIndicator,
    Alert
} from 'react-native';
import { LibraryContext } from '../components/LibraryContext'; 
import { CommonActions } from '@react-navigation/native';

const PublishScreen = ({ route, navigation }) => {
    const { artwork } = route.params || {}; 
    const { addItemToLibrary } = useContext(LibraryContext); 

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [price, setPrice] = useState(artwork.price || ''); 
    const [title, setTitle] = useState(artwork.title || ''); 
    const [modalVisible, setModalVisible] = useState(false); 
    const [loading, setLoading] = useState(false); 

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handleVerifyAndPublish = () => {
        setModalVisible(true); 
        setLoading(true); 

        setTimeout(() => {
            setLoading(false);

            const artworkWithDetails = {
                ...artwork,
                price: price || '0 VND',
                title: title,
                plan: selectedPlan || 'No Plan Selected',
            };

            addItemToLibrary(artworkWithDetails);

            Alert.alert("Success", "Artwork has been successfully published!", [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Market' }], // ✅ Move back to Library after publishing
                            })
                        );
                    }
                }
            ]);
            setModalVisible(false);
        }, 3000);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Artwork Image */}
            <Image 
                source={{ uri: artwork.imageUrl || 'https://via.placeholder.com/300' }}  
                style={styles.artworkImage}
                resizeMode="contain"
            />

            {/* Title Input */}
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />

            {/* Price Input */}
            <Text style={styles.label}>Price</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price in VND"
                keyboardType="numeric" 
            />

            {/* Pricing Options */}
            <Text style={styles.label}>Select Pricing Plan</Text>
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

            {/* Confirm Button */}
            <TouchableOpacity style={styles.button} onPress={handleVerifyAndPublish}>
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            {/* Verification Modal */}
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2E5077',
    },
    input: {
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    selectedCard: {
        borderWidth: 3,
        borderColor: '#79D7BE',
        backgroundColor: '#E8F5E9',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    billing: {
        fontSize: 14,
        color: '#666',
    },
    yearly: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    discount: {
        fontSize: 16,
        color: '#FF5722',
        fontWeight: 'bold',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#79D7BE',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
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
    modalText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
});

export default PublishScreen;
