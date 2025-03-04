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
import { getToken, sellArt } from '../services/apiService';

const PublishScreen = ({ route, navigation }) => {
    const { artwork } = route.params || {}; 
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [price, setPrice] = useState(artwork.price || 0); 
    const [title, setTitle] = useState(artwork.title || ''); 
    const [modalVisible, setModalVisible] = useState(false); 
    const [loading, setLoading] = useState(false); 

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handleVerifyAndPublish = async () => {
        try {
            const token = await getToken();
            console.log("Token:", token);
            setModalVisible(true); 
            setLoading(true); 
            
            const sanitizedPrice = price.replace(/[^0-9.]/g, '');

            const numericPrice = parseFloat(sanitizedPrice);

            if (isNaN(numericPrice) || numericPrice <= 0) {
                Alert.alert("Error", "Please enter a valid price.");
                setLoading(false);
                setModalVisible(false);
                return;
            }
        
            const response = await sellArt(token, title, numericPrice); // Send the full object to the API
            setLoading(false);
            console.log("Response:", response);

            if (response.msg === "Completed") {
                Alert.alert("Success", "Artwork has been successfully published!", [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate('MainTabs', { screen: 'Market' });}
                    }
                ]);
            }
        } catch (error) {
            setLoading(false);
            if (response.msg === "Picture not owned") {
                Alert.alert("Ownership Required", "You do not own this picture. Please register ownership first.", [
                    { text: "OK", onPress: () => { /* Perhaps navigate to ownership registration */ } }
                ]);            
            } else {
                console.error("Error selling artwork:", error);
                Alert.alert("Error", "An error occurred while publishing the artwork.");
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Artwork Image */}
            <Image 
                source={{ uri: artwork.imageUrl }}  
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
