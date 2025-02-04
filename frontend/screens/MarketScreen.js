import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For cart icon
import Header from '../components/Header';
import CategoryFilter from '../components/FilterButtons'; 
import ProfilePic from '../assets/home/ava.png';

const categories = ["All", "Special", "Natural", "Mandalas", "Wildlife"];

const UserHeader = () => {
    return (
        <View style={styles.userHeaderContainer}>
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Hi, Jane!</Text>
                <Text style={styles.subtitleText}>Explore the world</Text>
            </View>
            <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.buttonText}>Upgrade</Text>
            </TouchableOpacity>
            <Image source={ProfilePic} style={styles.profilePicture} />
        </View>
    );
};

const MarketScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const marketItems = Array.from({ length: 10 }, (_, i) => ({
        id: (i + 1).toString(),
        title: `Lorem ipsum do`, 
        image: require("../assets/market/art_buy.png"), // Sample image
        price: `176.000đ`, 
        username: "@username",
        userAvatar: require("../assets/market/buy.png"), // Replace with actual path
    }));

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Buying", { item })}>
            {/* Artwork Image */}
            <Image source={item.image} style={styles.cardImage} />

            {/* Title & Cart Icon */}
            <View style={styles.titleContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <TouchableOpacity>
                    <Ionicons name="cart-outline" size={20} color="black" />
                </TouchableOpacity>
            </View>

            {/* User Info & Price */}
            <View style={styles.userPriceContainer}>
                {/* User Info */}
                <View style={styles.userContainer}>
                    <Image source={item.userAvatar} style={styles.userAvatar} />
                    <Text style={styles.username}>{item.username}</Text>
                </View>

                {/* Price */}
                <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <UserHeader />

            {/* Category Filter */}
            <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
            />

            {/* Market Items */}
            <View style={styles.container}>
                <FlatList
                    data={marketItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Grid format
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    userHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFF',
    },
    greetingContainer: {
        flex: 1,
    },
    greetingText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitleText: {
        fontSize: 18,
        color: 'gray',
    },
    upgradeButton: {
        backgroundColor: '#79D7BE',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        right: 5,
    },
    buttonText: {
        color: 'white',
        marginRight: 5,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 25,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    listContainer: {
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 3,
        alignItems: 'center',
        width: "45%", // Adjusted for spacing
    },
    cardImage: {
        width: "100%",
        height: 150,
        borderRadius: 10,
        resizeMode: "cover",
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 8,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        flex: 1, 
    },
    userPriceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 8,
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    userAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
    },
    username: {
        fontSize: 10,
        fontWeight: "bold",
        color: "gray",
        right: 3,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#2A9D8F", 
    },
});

export default MarketScreen;
