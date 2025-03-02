import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";

const BuyingScreen = ({ route, navigation }) => {
    // Ensure that item is passed via route.params
    const item = route.params?.item || {
        title: "Unknown Artwork",
        username: "Unknown Artist",
        price: "0 VND",
        imageUrl: "https://via.placeholder.com/400x300", // Placeholder image URL
        userAvatar: "https://via.placeholder.com/50", // Placeholder avatar URL
        location: "Unknown Location",
    };

    const [isBuyPressed, setIsBuyPressed] = useState(false);
    const [isDrawPressed, setIsDrawPressed] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            {/* Image with proper check */}
            <Image source={{ uri: item.imageUrl }} style={styles.artImage} />

            <View style={styles.infoContainer}>
                <View style={styles.userDetails}>
                    <Image source={{ uri: item.userAvatar }} style={styles.userAvatar} />
                    <View style={styles.textContainer}>
                        <Text style={styles.artTitle}>{item.title}</Text>
                        <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                    <Text style={styles.price}>{item.price}</Text>
                </View>

                <Text style={styles.description}>
                    This is a beautiful piece of artwork created by {item.username}. 
                    A perfect addition to your collection.
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.buyButton, isBuyPressed && styles.buttonPressed]} 
                    onPressIn={() => setIsBuyPressed(true)}
                    onPressOut={() => setIsBuyPressed(false)}
                    onPress={() => navigation.push("CheckoutScreen", { item })}  
                >
                    <Text style={styles.buttonText}>Buy now</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.drawButton, isDrawPressed && styles.buttonPressed]} 
                    onPressIn={() => setIsDrawPressed(true)}
                    onPressOut={() => setIsDrawPressed(false)}
                >
                    <Text style={styles.buttonText}>New Draw</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    artImage: {
        width: "100%",
        height: 297,
        borderRadius: 10,
        resizeMode: "cover",
    },
    infoContainer: {
        marginTop: 15,
        backgroundColor: "#F6F4F0",
        borderRadius: 15,
        padding: 16,
    },
    userDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    artTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    locationText: {
        fontSize: 14,
        color: "gray",
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2A9D8F",
    },
    description: {
        marginTop: 10,
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingBottom: 20,
    },
    buyButton: {
        backgroundColor: "#2A9D8F",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
    },
    drawButton: {
        backgroundColor: "#777",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
    },
    buttonPressed: {
        backgroundColor: "#555",
    },
});

export default BuyingScreen;
