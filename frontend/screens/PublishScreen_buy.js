import React, { useState } from 'react';
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
import { useWalletConnectModal } from '@walletconnect/modal-react-native'; // Assuming WalletConnect is set up

const PublishScreen = ({ route, navigation }) => {
    const { artwork } = route.params || {}; 
    const { isConnected, address, provider } = useWalletConnectModal();  // WalletConnect hooks
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [price, setPrice] = useState(artwork.price || 0); 
    const [title, setTitle] = useState(artwork.title || ''); 
    const [modalVisible, setModalVisible] = useState(false); 
    const [loading, setLoading] = useState(false);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const signText = async (textToSign) => {
        try {
            if (textToSign === "") throw new Error("Text is empty");
            if (!isConnected || !address) throw new Error("Wallet is not connected");

            const signature = await provider.request({
                method: "personal_sign",
                params: [textToSign, address],
            });
            Alert.alert("Success", "Text signed successfully!");
            return signature;
        } catch (error) {
            console.error("Signing failed:", error);
            Alert.alert("Error", "Signing failed: " + error.message);
            return null;
        }
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
        
            // Sign the title and price before publishing the artwork
            const textToSign = `${title} - ${numericPrice} VND`;  // Example text to sign
            const signedText = await signText(textToSign);  // Sign the text

            if (signedText) {
                // Proceed with the artwork publication
                const response = await sellArt(token, title, numericPrice, signedText); // Send the signed text to the API
                setLoading(false);
                console.log("Response:", response);

                if (response.msg === "Completed") {
                    Alert.alert("Success", "Artwork has been successfully published!", [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate('MainTabs', { screen: 'Market' });
                            }
                        }
                    ]);
                }
            } else {
                setLoading(false);
                setModalVisible(false);
                Alert.alert("Error", "Failed to sign the text.");
            }
        } catch (error) {
            setLoading(false);
            console.error("Error during publication:", error);
            Alert.alert("Error", "An error occurred while publishing the artwork.");
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
                <View>
                    <Text style={styles.modalText}>Artwork verification complete!</Text>
                    {/* OK Button */}
                    <TouchableOpacity
                        style={styles.okButton}
                        onPress={() => {
                            setModalVisible(false);  // Close the modal
                            navigation.navigate('MainTabs', { screen: 'Market' }); // Navigate to Market (or any other screen)
                        }}
                    >
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#F0F8FF',
        borderWidth: 1,
        borderColor: '#79D7BE',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    billing: {
        fontSize: 12,
    },
    okButton: {
        backgroundColor: "#79D7BE", // Button color
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    okButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    yearly: {
        color: '#F6A800',
    },
    discount: {
        fontSize: 12,
        color: '#FF6347',
    },
    button: {
        backgroundColor: '#79D7BE',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalInnerContent: {
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#333',
    },
});

export default PublishScreen;
