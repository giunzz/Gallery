import React, { useState } from 'react';
import {
    ScrollView, SafeAreaView, View, Text, TouchableOpacity,
    Image, TextInput, StyleSheet, FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons for the newfeed actions
import Card from '../components/Card';
import Header from '../components/Header';

import ColorImage from '../assets/home/Color.png';
import ShopImage from '../assets/home/Shop.png';
import GenArt from '../assets/home/Gallery Add.png';
import UpgradeIcon from '../assets/home/Ellipse.png';
import ProfilePic from '../assets/home/ava.png';
import ArtImage from '../assets/home/art.png';


// User Header Component
const UserHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Hi, Jane!</Text>
                <Text style={styles.subtitleText}>Explore the world</Text>
            </View>
            <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.buttonText}>Upgrade</Text>
                <Image source={UpgradeIcon} style={styles.icon} />
            </TouchableOpacity>
            <Image source={ProfilePic} style={styles.profilePicture} />
        </View>
    );
};

const NewfeedArt = ({ imageSource, title, artistName }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.newfeedCard}>
            {/* Artwork Image */}
            <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />

            {/* Artist Name */}
            <Text style={styles.artistName}>{title}</Text>

            {/* Action Buttons (Like, Comment, Report) */}
            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="heart-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="chatbubble-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.reportButton}
                    onPress={() => navigation.navigate('ReportScreen', { artwork: { title, artistName, imageSource } })}
                >
                    <Text style={styles.reportText}>Report</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};




const ExploreScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const artworks = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        title: `Artwork ${i + 1}`,
        imageSource: ArtImage,
    }));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={navigation} />
            <UserHeader />

            {/* Scrollable Art Feed */}
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* Top Card */}
                <View style={styles.topCardContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('NewArtScreen')}>
                        <Card title="New Art" imageSource={ColorImage} style={styles.topCard}>
                            <Text style={styles.cardSubtitle}>Let's see what can I do for you?</Text>
                            <Image source={require('../assets/home/guitar.png')} style={styles.cardVisual} />
                        </Card>
                    </TouchableOpacity>
                </View>

                {/* Middle Cards */}
                <View style={styles.middleCardContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('GenerateArtScreen')} style={styles.middleCard}>
                        <Card title="Generate Picture" imageSource={GenArt} style={styles.generateCard}>
                            <Image source={require('../assets/home/chat.png')} style={styles.cardVisualSmall} />
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('MarketScreen')} style={styles.middleCard}>
                        <Card title="Exploring Market" imageSource={ShopImage} style={styles.marketCard}>
                            <Image source={require('../assets/home/megaphone.png')} style={styles.cardVisualSmall} />
                        </Card>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search name"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Newfeed Art Loop */}
                <Text style={styles.sectionTitle}>Newfeed Art</Text>
                <FlatList
                    data={artworks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <NewfeedArt imageSource={item.imageSource} title={item.title} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        right: 6
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
 /// Top Card
    CardTitle: {
        fontSize: 16,  // Reduce from 18 to 14
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#FFFFFF',
        flexShrink: 1, // Prevents text from breaking UI
    },

    topCardContainer: {
        marginBottom: 20,
    },
    topCard: {
        backgroundColor: "#F7BB36",
        padding: 25,
        borderRadius: 20,
        height: 180,
        position: "relative", // Ensure children respect positioning
    },
    cardSubtitle: {
        fontSize: 16,
        color: "#FFFFFF",
        marginTop: 10,
    },
    cardVisual: {
        width: 90,
        height: 90,
        position: "left",
        left: 10, // Move the image to the left side
        bottom: 10, // Align towards the bottom
    },

    // Middle Cards
    middleCardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    middleCard: {
        flex: 1,
        marginHorizontal: 5,
    },
    generateCard: {
        backgroundColor: "#FF8358",
        padding: 20,
        borderRadius: 20,
        height: 120,
        position: "relative", // Ensures proper child positioning
    },
    marketCard: {
        backgroundColor: "#7851A9",
        padding: 20,
        borderRadius: 20,
        height: 120,
        position: "relative",
    },
    cardVisualSmall: {
        width: 40,
        height: 40,
        position: "center",
        left: 20, // Moves small visuals to the left
        bottom: 20,
    },
    // Search Bar
    searchContainer: {
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },

    // Newfeed Section
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    newfeedCard: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    artistName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'flex-start',
        paddingLeft: 10,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    iconButton: {
        padding: 10,
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
});

export default ExploreScreen;