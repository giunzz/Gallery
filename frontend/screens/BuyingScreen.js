import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

const BuyingScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [isBuyPressed, setIsBuyPressed] = useState(false);
    const [isDrawPressed, setIsDrawPressed] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}></Text>

            <Image source={item.image} style={styles.artImage} />

            <View style={styles.infoContainer}>
                <View style={styles.userDetails}>
                    <Image source={item.userAvatar} style={styles.userAvatar} />
                    <View style={styles.textContainer}>
                        <Text style={styles.artTitle}>{item.title}</Text>
                        <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                    <Text style={styles.price}>{item.price}</Text>
                </View>

                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </View>

            <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={[styles.buyButton, isBuyPressed && styles.buttonPressed]} 
                onPressIn={() => setIsBuyPressed(true)}
                onPressOut={() => setIsBuyPressed(false)}
                onPress={() => navigation.push("Checkout", { item })}  
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
    headerText: {
        fontSize: 1,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
        color: "black",
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
