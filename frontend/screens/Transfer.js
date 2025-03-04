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
import { getToken, transferArt } from '../services/apiService'; // Assuming this exists
import { useNavigation, useRoute } from '@react-navigation/native';

const TransferArtScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params || {}; 
    console.log(item);
    const imageUrl = item?.imageUrl;

    const [recipientAddress, setRecipientAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTransfer = async () => {
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

            const response = await transferArt(token, item.id, recipientAddress);
            console.log(response);
            if (response.msg == "Completed") {
                Alert.alert('Success', 'Art transferred successfully!');
                navigation.goBack();
            } else {
                Alert.alert('Error', response.message || 'Failed to transfer art.');
            }
        } catch (error) {
            console.error('Error transferring art:', error);
            Alert.alert('Error', 'An error occurred while transferring the art.');
        } finally {
            setIsLoading(false);
        }
    };

    const isValidAddress = (address) => {
        return address.trim().length > 5;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>

            {/* Artwork Image */}
            <Image
                source={{ uri: imageUrl }} 
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
        fontSize: 16,
    },
    button: {
        backgroundColor: '#79D7BE',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#99c8d6',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        alignItems: 'center',
    },
});

export default TransferArtScreen;