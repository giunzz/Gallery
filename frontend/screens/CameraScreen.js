import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

const NotFoundScreen = () => (
    <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>No Results Found</Text>
        <Text style={styles.notFoundMessage}>
            We couldn't find what you searched for. Try searching again.
        </Text>
    </View>
);

const CameraScreen = () => {
    const cameraRef = useRef(null);
    const [imageUri, setImageUri] = useState(null);
    
    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            setImageUri(data.uri);
        }
    };

    // Simulate checking if the image exists (replace with your actual logic)
    const imageExists = (uri) => {
        // Add your logic here to check if the image exists in the library
        return uri !== null; // For demonstration, assuming imageUri is valid
    };

    if (imageUri && !imageExists(imageUri)) {
        return <NotFoundScreen />;
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
});

export default CameraScreen;