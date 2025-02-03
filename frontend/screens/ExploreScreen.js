import React, { useState } from 'react';
import { 
    ScrollView, SafeAreaView, View, Text, TouchableOpacity, 
    Image, TextInput, StyleSheet, FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import Header from '../components/Header';

import ColorImage from '../assets/home/Color.png';
import ShopImage from '../assets/home/Shop.png';
import GenArt from '../assets/home/Gallery Add.png';
import UpgradeIcon from '../assets/home/Ellipse.png';
import ProfilePic from '../assets/home/ava.png';
import ArtImage from '../assets/home/art.png'; // Import the artwork image

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

// Newfeed Art Component (Reusable for Looping)
const NewfeedArt = ({ imageSource, title }) => {
    return (
        <View style={styles.card}>
            <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
            <Text style={styles.artistName}>{title}</Text>
            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>❤️ Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Report</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const ExploreScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const imageSources = [ColorImage, GenArt, ShopImage]; 

    const artworks = Array.from({ length: 10 }, (_, i) => ({
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
                {/* Feature Buttons */}
                <TouchableOpacity onPress={() => navigation.navigate('NewArtScreen')}>
                    <Card title="New Art" imageSource={ColorImage}>
                        Let's see what can I do for you?
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('GeneratePlatter')}>
                    <Card title="Generate Platter" imageSource={GenArt}>
                        Explore new possibilities!
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MarketScreen')}>
                    <Card title="Exploring Market" imageSource={ShopImage}>
                        Discover amazing artworks!
                    </Card>
                </TouchableOpacity>

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
        right: 5,
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
    searchContainer: {
        padding: 1,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        bottom: -2
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    artistName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    actionButton: {
        padding: 10,
        backgroundColor: '#79D7BE',
        borderRadius: 5,
    },
    actionText: {
        color: '#FFFFFF',
    },
});

export default ExploreScreen;
