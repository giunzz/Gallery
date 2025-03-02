import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Modal,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ownership, getToken } from '../services/apiService';

const OwnershipScreen = ({ route, navigation }) => {
    const { artwork } = route.params || {}; 
    const [isChecked, setIsChecked] = useState(false); 
    const [price, setPrice] = useState(''); 
    const [modalVisible, setModalVisible] = useState(false); 
    const [ownershipData, setOwnershipData] = useState(null); 
    const [token_user, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await getToken();
                console.log("Retrieved Token:", storedToken);
                if (storedToken) {
                    setToken(storedToken);
                } else {
                    Alert.alert('Error', 'No token found. Please log in again.');
                }
            } catch (error) {
                console.error("Error retrieving token:", error);
                Alert.alert('Error', 'Failed to retrieve token.');
            }
        };
        fetchToken();
    }, []);

    const handleContinue = async () => {
        console.log('Price:', price);
        console.log('Artwork Token:', artwork.token);

        if (artwork.token && token_user) {
            setIsLoading(true); // Show loading indicator

            try {
                const own = await Ownership(token_user, artwork.token); // Pass the user and artwork tokens
                setOwnershipData(own);  
                setModalVisible(true);  
            } catch (error) {
                Alert.alert("Error", "Failed to fetch ownership data");
            } finally {
                setIsLoading(false); // Hide loading indicator
            }
        } else {
            Alert.alert("Error", "Artwork token or User token is missing");
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        navigation.navigate('MainTabs', { screen: 'Library' }); // Navigate to Library on modal close
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.imageContainer}>
                    <View style={styles.frame}>
                        <Image
                            source={{ uri: artwork.imageUrl }} 
                            style={styles.image}
                        />
                    </View>
                </View>

                <Text style={styles.artistName}>Token: {artwork.token}</Text>

                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setIsChecked(!isChecked)} 
                >
                    <Ionicons
                        name={isChecked ? 'checkmark-circle' : 'ellipse-outline'}
                        size={24}
                        color={isChecked ? 'green' : 'gray'}
                    />
                    <Text style={styles.checkboxText}>Resign ownership</Text>
                </TouchableOpacity>

                {isChecked && (
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                        placeholder="120.000đ"
                        keyboardType="numeric"
                    />
                )}

                <TouchableOpacity style={styles.continueButton} onPress={handleContinue} disabled={isLoading}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                {isLoading && <ActivityIndicator size="large" color="#79D7BE" style={styles.loadingIndicator} />}
            </ScrollView>

            {/* Success Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.checkmarkContainer}>
                            <Ionicons name="checkmark-circle" size={50} color="green" />
                        </View>
                        <Text style={styles.modalText}>Ownership Updated Successfully!</Text>
                        {ownershipData && <Text style={styles.modalText}>Ownership Data: {JSON.stringify(ownershipData)}</Text>}
                        <TouchableOpacity style={styles.okButton} onPress={handleModalClose}>
                            <Text style={styles.okButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 20,
    },
    scrollView: {
        alignItems: 'center',
    },
    artistName: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    frame: {
        borderWidth: 5,
        borderColor: '#E0E0E0',
        padding: 10,
        borderRadius: 15,
        overflow: 'hidden',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 16,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 20,
    },
    continueButton: {
        backgroundColor: '#79D7BE',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingIndicator: {
        marginTop: 20,
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    checkmarkContainer: {
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    okButton: {
        backgroundColor: '#79D7BE',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    okButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default OwnershipScreen;
