import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
    ScrollView,
    Button,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from '../components/Header';
import {
    WalletConnectModal,
    useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import config from '../config.js';

const projectId = config.PROJECT_ID;

const providerMetadata = {
    name: 'Gallery',
    description: 'YOUR_PROJECT_DESCRIPTION',
    url: 'https://your-project-website.com/',
    icons: ['https://your-project-logo.com/'],
    redirect: {
        native: 'YOUR_APP_SCHEME://',
        universal: 'YOUR_APP_UNIVERSAL_LINK.com',
    },
};

const collectionData = [
    { id: "1", title: "Looking", image: require("../assets/home/art.png") },
    { id: "2", title: "Dreamy", image: require("../assets/home/art.png") },
    { id: "3", title: "Surreal", image: require("../assets/home/art.png") },
];

const ProfileScreen = ({ navigation }) => {
    const { open, isConnected, address, provider } = useWalletConnectModal();
    const [text, setText] = useState('');
    const [selectedTab, setSelectedTab] = useState("Collection");

    const handleTextChange = (inputText) => {
        setText(inputText);
    };

    const signText = async (text) => {
        try {
            if (text === "") {
                throw new Error("Text is empty");
            }
            if (!isConnected) {
                throw new Error("Wallet is not connected");
            }

            const message = text;
            const signature = await provider.request({
                method: "personal_sign",
                params: [message, address],
            });

            return signature;
        } catch (error) {
            console.error("Signing failed:", error);
            return null;
        }
    };

    const connectWallet = async () => {
        if (isConnected) {
            return provider?.disconnect();
        }
        return open();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.headerIcons}>
                    <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
                    <Ionicons name="cart-outline" size={24} color="black" />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* Profile Section */}
                <View style={styles.profileCard}>
                    <Image source={require("../assets/home/ava.png")} style={styles.profileImage} />
                    <Text style={styles.username}>@Jane</Text>
                    <Ionicons name="shield-checkmark" size={16} color="gold" style={styles.verifiedBadge} />

                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.smallButton}>
                            <Text style={styles.buttonText}>Edit account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButtonDark}>
                            <Text style={styles.buttonText}>Payment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButton}>
                            <Text style={styles.buttonText}>Verify artist</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Stats */}
                    <View style={styles.statsContainer}>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>2k</Text>
                            <Text style={styles.statLabel}>Follower</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>10</Text>
                            <Text style={styles.statLabel}>Picture</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>89</Text>
                            <Text style={styles.statLabel}>Comments</Text>
                        </View>
                    </View>

                    {/* Connect Wallet Button */}
                    <Button title={isConnected ? address : "Connect Wallet"} onPress={() => connectWallet()} />

                    {/* Text Input for Signing */}
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, width: '80%' }}
                        placeholder="Enter text"
                        onChangeText={handleTextChange}
                    />
                    <Button title="Sign Text" onPress={() => {
                        signText(text).then(console.log);
                    }} />
                </View>

                {/* Tabs: Collection | Activity */}
                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === "Collection" && styles.activeTab]}
                        onPress={() => setSelectedTab("Collection")}
                    >
                        <Text style={styles.tabText}>Collection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === "Activity" && styles.activeTab]}
                        onPress={() => setSelectedTab("Activity")}
                    >
                        <Text style={styles.tabText}>Activity</Text>
                    </TouchableOpacity>
                </View>

                {/* Collection Section */}
                {selectedTab === "Collection" && (
                    <FlatList
                        data={collectionData}
                        renderItem={({ item }) => (
                            <View style={styles.artCard}>
                                <Image source={item.image} style={styles.artImage} />
                                <Text style={styles.artTitle}>{item.title}</Text>
                                <View style={styles.artActions}>
                                    <TouchableOpacity style={styles.viewButton}>
                                        <Text style={styles.viewText}>Publish</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.musicButton}>
                                        <Text style={styles.musicText}>Listen music</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.artGrid}
                    />
                )}
            </ScrollView>

            <WalletConnectModal
                explorerRecommendedWalletIds={[
                    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
                ]}
                explorerExcludedWalletIds={'ALL'}
                projectId={projectId}
                providerMetadata={providerMetadata}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "#79D7BE"
    },
    headerIcons: {
        flexDirection: "row",
        top: 8,
    },
    scrollView: {
        paddingBottom: 80
    },
    profileCard: {
        alignItems: "center",
        padding: 16
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 8
    },
    verifiedBadge: {
        marginLeft: 5
    },
    buttonGroup: {
        flexDirection: "row",
        marginTop: 8
    },
    smallButton: {
        backgroundColor: "#79D7BE",
        padding: 6,
        margin: 5,
        borderRadius: 8
    },
    smallButtonDark: {
        backgroundColor: "#1B5E20",
        padding: 6,
        margin: 5,
        borderRadius: 8
    },
    buttonText: {
        color: "white",
        fontSize: 12
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        marginTop: 16
    },
    stat: {
        alignItems: "center"
    },
    statNumber: {
        fontSize: 16,
        fontWeight: "bold"
    },
    statLabel: {
        fontSize: 12,
        color: "gray"
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16
    },
    tab: {
        padding: 10,
        marginHorizontal: 20
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: "#79D7BE"
    },
    tabText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    artGrid: {
        padding: 10
    },
    artCard: {
        flex: 1,
        margin: 10
    },
    artImage: {
        width: "100%",
        height: 100,
        borderRadius: 10
    },
    artTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5
    },
    artActions: {
        flexDirection: "row",
        marginTop: 5
    },
    viewButton: {
        backgroundColor: "#79D7BE",
        padding: 4,
        borderRadius: 5,
        marginRight: 5
    },
    musicButton: {
        backgroundColor: "#FFD700",
        padding: 4,
        borderRadius: 5
    },
});

export default ProfileScreen;
