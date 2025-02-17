import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

// NotFoundScreen Component
const NotFoundScreen = () => {
    const navigation = useNavigation(); // Hook to access navigation

    const handleOkPress = () => {
        navigation.navigate('CameraScreen'); // Navigate back to CameraScreen or wherever you want
    };

    return (
        <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>No Results Found</Text>
            <Text style={styles.notFoundMessage}>
                We couldn't find what you searched for. Try searching again.
            </Text>
            <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
                <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    );
};

// CameraScreen Component
const CameraScreen = () => {
    const cameraRef = useRef(null);
    const [imageUri, setImageUri] = useState(null);
    const navigation = useNavigation(); // Hook to access navigation

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            setImageUri(data.uri);
        }
    };

    // Simulate checking if the image exists (replace with your actual logic)
    const imageExists = (uri) => {
        return uri !== null; // For demonstration, assuming imageUri is valid
    };

    // Check if the image exists; if not, navigate to NotFoundScreen
    if (imageUri && !imageExists(imageUri)) {
        navigation.navigate('NoResultsScreen'); // Navigate to NoResultsScreen
        return null; // Prevent rendering of CameraScreen
    }

    return (
        <View style={styles.container}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <RNCamera
                    ref={cameraRef}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Camera Permission',
                        message: 'We need your permission to use your camera.',
                        buttonPositive: 'OK',
                        buttonNegative: 'Cancel',
                    }}
                >
                    <Button title="Capture" onPress={takePicture} />
                </RNCamera>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    notFoundMessage: {
        fontSize: 16,
        textAlign: 'center',
    },
    okButton: {
        marginTop: 20,
        backgroundColor: '#2d6a4f', // Dark green for button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    okButtonText: {
        color: '#ffffff', // White text for button
        fontSize: 16,
    },
});

export default CameraScreen;