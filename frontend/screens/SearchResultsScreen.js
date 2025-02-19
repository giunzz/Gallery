import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Using Ionicons for the heart and report icons
import ArtImage from '../assets/home/art.png';  // Placeholder image for artworks

// Sample data for artworks
const artworks = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Artwork ${i + 1}`,
    year: 2000 + (i + 1), 
}));

const SearchResultsScreen = ({ route }) => {
    const { searchQuery } = route.params;
    const [query, setQuery] = useState(searchQuery);  // Local state for search query
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={styles.artworkItem}>
            <Image source={ArtImage} style={styles.artworkImage} />
            <View style={styles.artworkDetails}>
                <Text style={styles.artistName}>Liam Princip</Text>
                <Text style={styles.artworkTitle}>{item.title}</Text>
                <Text style={styles.artworkYear}>{item.year}</Text>
            </View>
            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="heart-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.reportButton}
                    onPress={() => navigation.navigate('ReportScreen', { artwork: item })}
                >
                    <Text style={styles.reportText}>Report</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const filteredArtworks = artworks.filter((artwork) =>
        artwork.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search artworks"
                    value={query}
                    onChangeText={setQuery}
                />
            </View>

            {/* Artworks List */}
            <FlatList
                data={filteredArtworks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.noResultsText}>No results found</Text>}
            />
        </SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 40,
        margin: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: 'gray',
    },
    headerContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    searchQuery: {
        fontSize: 16,
        color: 'gray',
    },
    listContainer: {
        padding: 16,
    },
    artworkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        padding: 12,
    },
    artworkImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    artworkDetails: {
        flex: 1,
    },
    artistName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    artworkTitle: {
        fontSize: 14,
        color: 'gray',
    },
    artworkYear: {
        fontSize: 12,
        color: 'gray',
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
        marginRight: 10,
    },
    reportButton: {
        backgroundColor: '#E57373',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    reportText: {
        color: 'white',
        fontWeight: 'bold',
    },
    noResultsText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
    },
});

export default SearchResultsScreen;
