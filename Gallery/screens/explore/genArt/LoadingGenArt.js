import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingGenArt = ({ route, navigation }) => {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const { prompt, selectedCanvas } = route.params;

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setLoading(false);
                    // Navigate to the result screen after loading is complete
                    navigation.navigate('ResultGenArt', { prompt, selectedCanvas }); // Pass any necessary data
                    return 100;
                }
                return prev + 10; 
            });
        }, 500); 

        return () => clearInterval(interval);
    }, [navigation, prompt, selectedCanvas]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Generating Artwork...</Text>
            <ActivityIndicator size="large" color="#79D7BE" />
            <Text style={styles.progressText}>{`Progress: ${progress}%`}</Text>
            {loading ? (
                <Text style={styles.loadingText}>
                    Please wait while we create your artwork with the prompt: "{prompt}" on a {selectedCanvas} canvas!
                </Text>
            ) : (
                <Text style={styles.completedText}>Artwork Generated Successfully!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0FFFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    progressText: {
        fontSize: 18,
        marginTop: 10,
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    completedText: {
        fontSize: 20,
        color: '#79D7BE',
        marginTop: 20,
    },
});

export default LoadingGenArt;

// const generateArtwork = async () => {
//     try {
//         const response = await fetch('YOUR_API_ENDPOINT_HERE', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 prompt,
//                 canvas: selectedCanvas,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         // Simulate API progress
//         simulateLoading();

//         // Handle the response, e.g., store the artwork URL or data
//         const data = await response.json();
//         console.log(data); // Replace with appropriate logic to handle the generated artwork

//         // Once the artwork is generated, stop the loading
//         setProgress(100);
//         setLoading(false);
//     } catch (error) {
//         setError(error.message);
//         setLoading(false);
//     }
// };

// generateArtwork();
// }, [prompt, selectedCanvas]);
