import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Header from '../components/Header';
import ProfilePic from '../assets/home/ava.png'; // Update with the correct path to your profile picture

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
    // Dynamically generating market items from 1 to 10
    const marketItems = Array.from({ length: 10 }, (_, i) => ({
        id: (i + 1).toString(),
        title: `Artwork ${i + 1}`,
        image: require("../assets/home/art.png"), // Ensure this image exists
        price: `$${(i + 1) * 50}`, // Increasing price dynamically
    }));

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <UserHeader />
            <View style={styles.container}>
                <FlatList
                    data={marketItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Display items in a grid format
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
        backgroundColor: '#FFFFFF',
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
    },
    buttonText: {
        color: 'white',
        marginRight: 5,
    },
    icon: {
        width: 20,
        height: 20,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    listContainer: {
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 3,
        padding: 10,
        alignItems: 'center',
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    itemPrice: {
        fontSize: 14,
        color: 'gray',
    },
});

export default MarketScreen;
