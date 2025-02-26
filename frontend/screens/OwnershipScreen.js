import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OwnershipScreen = ({ route, navigation }) => {
    const { artwork } = route.params; // Get the artwork object from navigation parameters

    const [isChecked, setIsChecked] = useState(false); // Track the checkbox state
    const [price, setPrice] = useState(''); // Track the price input value

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}></Text>

                {/* Artwork Display with Frame */}
                <View style={styles.imageContainer}>
                    <View style={styles.frame}>
                        <Image
                            source={artwork.image} // Use the passed image
                            style={styles.image}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setIsChecked(!isChecked)} // Toggle checkbox state
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

                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => {
                        // Handle continue action
                        console.log('Price:', price);
                        navigation.navigate('NextScreen'); // Replace with your next screen
                    }}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    frame: {
        borderWidth: 5,
        borderColor: '#E0E0E0', // Light gray frame color
        padding: 10, // Padding between the image and the frame
        borderRadius: 15, // Optional: rounded corners for the frame
        overflow: 'hidden', // Ensures the image stays within the frame bounds
    },
    image: {
        width: '100%', // Ensure image fills the container
        height: undefined,
        aspectRatio: 1, // Maintain aspect ratio of the image
        resizeMode: 'contain', // Ensure the image is contained within the frame
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
});

export default OwnershipScreen;
