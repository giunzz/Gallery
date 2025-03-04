import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { getToken, transferArt, signText as signTextFromWallet } from '../services/apiService'; // Assuming signText exists
import { useNavigation, useRoute } from '@react-navigation/native';
import { useWalletConnectModal } from '@walletconnect/modal-react-native'; // Ensure WalletConnect hook is imported

const TransferArtScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params || {}; 
    const imageUrl = item?.imageUrl;

    // WalletConnect hooks
    const { open, isConnected, address, provider } = useWalletConnectModal();

    const [recipientAddress, setRecipientAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(''); // Message to display after signing

    const handleTransfer = async () => {
        if (!imageUrl) {
            Alert.alert('Error', 'No image found for this artwork.');
            return;
        }

        setIsLoading(true);
        try {
            const token = await getToken();
            if (!token) {
                Alert.alert('Error', 'Authorization token is missing.');
                return;
            }

            if (!isValidAddress(recipientAddress)) {
                Alert.alert('Error', 'Invalid recipient address.');
                return;
            }
            console.log("Item: ", item);
            const response = await transferArt(token, item.token, recipientAddress);
            console.log(response);

            if (response.msg === "Completed") {
                // Step 1: Sign the message after successful transfer
                const signedMessage = await signText(`Transfer of ${item.token} to ${recipientAddress}`, provider, address);
                if (signedMessage) {
                    setMessage("Artwork transfer and signing successful!");
                } else {
                    setMessage("Failed to sign the message.");
                }

                // Step 2: Display success message
                Alert.alert('Success', 'Art transferred and signed successfully!');
                
                // Navigate to the Library screen after success
                navigation.navigate('MainTabs', { screen: 'Library' });
            } else {
                console.error('Error transferring art:', error);
                Alert.alert('Error', response.message || 'Failed to transfer art.');
            }
        } catch (error) {
            console.error('Error transferring art:', error);
            Alert.alert('Error', error?.message || 'An error occurred while transferring the art.');
        } finally {
            setIsLoading(false);
        }
    };

    // Signing text
    const signText = async (textToSign, provider, address) => {
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

    const isValidAddress = (address) => {
        return address.trim().length > 5;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transfer Artwork</Text>

            {/* Artwork Image */}
            <Image
                source={{ uri: imageUrl}} // Fallback image
                style={styles.image}
            />

            {/* Token Info */}
            <Text style={styles.tokenInfo}>Token: {item?.token}</Text>

            {/* Recipient Address Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter recipient address</Text>
                <View style={styles.textInputWrapper}>
                    <TextInput
                        style={styles.input}
                        value={recipientAddress}
                        onChangeText={setRecipientAddress}
                        placeholder="Enter recipient address"
                        editable={!isLoading} // Disable input while loading
                    />
                    <TouchableOpacity style={styles.clearButton} onPress={() => setRecipientAddress('')}>
                        <Text style={styles.clearButtonText}>x</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Transfer Button */}
            <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]} // Apply disabled style
                onPress={handleTransfer}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" /> // Show loading indicator
                ) : (
                    <Text style={styles.buttonText}>Confirm</Text>
                )}
            </TouchableOpacity>

            {/* Display the result message */}
            {message && <Text style={styles.resultMessage}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4FBF2',
        padding: 20,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tokenInfo: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        color: '#333',
        fontSize: 16,
    },
    textInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#000',
        fontSize: 16,
    },
    clearButton: {
        marginLeft: 5,
        padding: 8,
        backgroundColor: '#465E6E',
        borderRadius: 20,
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#2A9D8F',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#B0B0B0',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultMessage: {
        marginTop: 20,
        textAlign: 'center',
        color: '#333',
        fontSize: 16,
    },
});

export default TransferArtScreen;
