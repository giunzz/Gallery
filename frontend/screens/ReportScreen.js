import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ReportScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { artwork } = route.params; // Get artwork data from route parameters

    const [selectedReason, setSelectedReason] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    const handleNext = () => {
        console.log('Selected Reason:', selectedReason);
        console.log('Additional Info:', additionalInfo);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}></Text>
            </View>

            {/* Artwork Image */}
            <Image source={artwork.imageSource} style={styles.artworkImage} resizeMode="cover" />

            {/* Artwork Info */}
            <View style={styles.profileCard}>
                <Text style={styles.NameArt}>{artwork.title}</Text>
                <Text style={styles.artistName}>{artwork.artistName || 'Artist Name'}</Text>
            </View>

            <View style={styles.reasonContainer}>
                <TouchableOpacity onPress={() => setSelectedReason('Copyright Violation')}>
                    <Text style={[styles.reasonText, selectedReason === 'Copyright Violation' && styles.selectedReason]}>
                        Copyright Violation
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedReason('Inappropriate Content')}>
                    <Text style={[styles.reasonText, selectedReason === 'Inappropriate Content' && styles.selectedReason]}>
                        Inappropriate Content
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedReason('Poor Quality')}>
                    <Text style={[styles.reasonText, selectedReason === 'Poor Quality' && styles.selectedReason]}>
                        Poor Quality
                    </Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="More: Type here..."
                    value={additionalInfo}
                    onChangeText={setAdditionalInfo}
                />
            </View>

            <Button title="Next" onPress={handleNext} />
            {/* Blue Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    header: {
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    artworkImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    profileCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    NameArt: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    artistName: {
        color: '#888',
        fontSize: 16,
    },
    reasonContainer: {
        marginBottom: 20,
    },
    reasonText: {
        fontSize: 16,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginVertical: 5,
    },
    selectedReason: {
        backgroundColor: '#79D7BE',  // Highlight color for selected option
        color: '#ffffff',            // Change text color for better visibility
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#79D7BE", 
        paddingVertical: 10,
        alignItems: "center",
    },
});

export default ReportScreen;
