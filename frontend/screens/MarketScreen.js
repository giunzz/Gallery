import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MarketScreen = () => {
    // Sample data for market items
    const marketItems = [
        { id: '1', title: 'Artwork 1', image: require('../assets/home/art.png'), price: '$100' },
        { id: '2', title: 'Artwork 2', image: require('../assets/home/art.png'), price: '$150' },
        { id: '3', title: 'Artwork 3', image: require('../assets/home/art.png'), price: '$200' },
        { id: '4', title: 'Artwork 4', image: require('../assets/home/art.png'), price: '$250' },
        // Add more items as needed
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Market</Text>
            <FlatList
                data={marketItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2} // Display items in a grid format
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E0FFFF', // Light background color
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
