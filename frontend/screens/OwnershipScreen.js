import React from 'react';
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Ownership</Text>

                <View style={styles.imageContainer}>
                    <Image
                        source={artwork.image} // Use the passed image
                        style={styles.image}
                    />
                </View>

                <View style={styles.checkboxContainer}>
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                    <Text style={styles.checkboxText}>Resign ownership</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="120.000d"
                    keyboardType="numeric"
                />

                <TouchableOpacity 
                    style={styles.continueButton} 
                    onPress={() => navigation.navigate('NextScreen')} // Replace with your next screen
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
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 300,
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
});

export default OwnershipScreen;