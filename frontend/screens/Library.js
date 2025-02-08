import React, { useState, useContext, useEffect } from "react";
import { 
    View, Text, FlatList, Image, TouchableOpacity, 
    StyleSheet, SafeAreaView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LibraryContext } from '../screens/LibraryContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArtImage from '../assets/home/art.png';

const LibraryScreen = ({ navigation }) => {
    const { libraryItems } = useContext(LibraryContext);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        loadLibraryData();
    }, [libraryItems]); 

    const loadLibraryData = async () => {
        try {
            const savedLibrary = await AsyncStorage.getItem("libraryItems");
            const parsedLibrary = savedLibrary ? JSON.parse(savedLibrary) : [];
            setArtworks([
                ...parsedLibrary, 
                ...Array.from({ length: 10 }, (_, i) => ({
                    id: `static-${i + 1}`,
                    title: `Artwork ${i + 1}`,
                    type: `Type ${i + 1}`,
                    image: ArtImage,
                }))
            ]);
        } catch (error) {
            console.error("Error loading library data", error);
        }
    };

    const toggleSelection = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleViewButtonPress = () => {
        if (selectedArtwork) {
            navigation.navigate('ArtworkDetail', { artwork: selectedArtwork });
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={[styles.card, selectedItems.includes(item.id) && styles.selectedCard]} 
            onPress={() => {
                toggleSelection(item.id);
                setSelectedArtwork(item);
            }}
        >
            <Image source={typeof item.image === "string" ? { uri: item.image } : item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardArtist}>{item.type || "Unknown Type"}</Text>
            {selectedItems.includes(item.id) && (
                <Ionicons name="checkmark-circle" size={24} color="#79D7BE" style={styles.checkIcon} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerTitle}>
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
                <Text style={styles.headerTitle}>Library</Text>
                <Text style={styles.headerTitle}>|</Text>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={styles.headerIcons}>
                    <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
                    <Ionicons name="cart-outline" size={24} color="black" />
                </View>
            </View>

            {/* Artwork Grid */}
            <FlatList
                data={artworks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.grid}
            />

            {/* Bottom Navigation */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomButton}>
                    <Text style={styles.bottomText}>New art</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity 
                    style={styles.bottomButton} 
                    onPress={handleViewButtonPress}
                >
                    <Text style={styles.bottomText}>View</Text>
                    <Ionicons name="arrow-forward" size={18} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#79D7BE",
        justifyContent: "space-between",
        paddingVertical: 25,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 10,
        top: 10,
    },
    headerIcons: {
        flexDirection: "row",
        top: 10,
    },
    icon: {
        marginRight: 10,
    },
    grid: {
        paddingBottom: 80,
    },
    card: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        alignItems: "center",
        position: "relative",
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: "#79D7BE",
    },
    cardImage: {
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
    },
    cardArtist: {
        fontSize: 12,
        color: "gray",
    },
    checkIcon: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    bottomBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#79D7BE",
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    bottomText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        marginRight: 5,
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: "black",
    },
});


export default LibraryScreen;
