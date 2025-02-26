import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
    ScrollView,
    TextInput,
    Alert,
    Clipboard, // Import Clipboard
    ToastAndroid, // Import ToastAndroid (for Android)
    Platform, // Import Platform to check the OS
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
    WalletConnectModal,
    useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import config from "../config.js";
import { getMessageFromServer, getAuthorizationToken } from "../services/apiService";

const projectId = config.PROJECT_ID;

const providerMetadata = {
    name: "Gallery",
    description: "YOUR_PROJECT_DESCRIPTION",
    url: "https://your-project-website.com/",
    icons: ["https://your-project-logo.com/"],
    redirect: {
        native: "YOUR_APP_SCHEME://",
        universal: "YOUR_APP_UNIVERSAL_LINK.com",
    },
};

const collectionData = [
    { id: "1", title: "Looking", image: require("../assets/home/art.png") },
    { id: "2", title: "Dreamy", image: require("../assets/home/art.png") },
    { id: "3", title: "Surreal", image: require("../assets/home/art.png") },
];

const AccountScreen = ({ navigation }) => {
    const { open, isConnected, address, provider, close } = useWalletConnectModal();
    const [text, setText] = useState("");
    const [selectedTab, setSelectedTab] = useState("Collection");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [signed, setSigned] = useState(false); // Track if signing was successful

    const handleTextChange = (inputText) => {
        setText(inputText);
    };

    const handleConnectWallet = useCallback(async () => {
        try {
            if (!isConnected) {
                await open();
                return;
            }
            const userAddress = address;
            const serverMessage = await getMessageFromServer(userAddress);
            setMessage(serverMessage);
            console.log(serverMessage);
            const signature = await provider.request({
                method: "personal_sign",
                params: [serverMessage, userAddress],
            });
            const authToken = await getAuthorizationToken(
                userAddress,
                serverMessage,
                signature
            );
            console.log(authToken);
            setToken(authToken);
            Alert.alert("Success", "Wallet connected and token received!");
        } catch (error) {
            console.error("Error in wallet connection flow:", error);
            Alert.alert("Error", "Failed to connect wallet or obtain token.");
        }
    }, [isConnected, open, address, provider]);

    const signText = async (text) => {
        try {
            if (text == "") {
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
            console.log("Message:", message)
            console.log("Signature:", signature)

            // Success!  Show alert and hide button.
            Alert.alert("Success", "Text signed successfully!");
            setSigned(true); // Set signed to true
            return signature;

        } catch (error) {
            console.error("Signing failed:", error);
            Alert.alert("Error", "Signing failed: " + error.message); // Show error in alert
            return null;
        }
    };

    useEffect(() => {
        if (isConnected) {
            handleConnectWallet();
        }
    }, [isConnected, handleConnectWallet]);

    // Function to copy text to clipboard
    const copyToClipboard = async (textToCopy) => {
        await Clipboard.setString(textToCopy);

        // Show a toast notification (different for Android and iOS)
        if (Platform.OS === 'android') {
            ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
        } else {
            // For iOS, use an Alert (or a custom notification library)
            Alert.alert("Copied", "Text copied to clipboard!");
        }
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.headerIcons}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Ionicons name="cart-outline" size={24} color="black" />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.profileCard}>
                    <Image
                        source={require("../assets/home/ava.png")}
                        style={styles.profileImage}
                    />
                    <Text style={styles.username}>@Jane</Text>
                    <Ionicons name="shield-checkmark" size={16} color="gold" />

                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.smallButton}>
                            <Text style={styles.buttonText}>Edit account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallButton}>
                            <Text style={styles.buttonText}>Verify artist</Text>
                        </TouchableOpacity>
                    </View>

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

                    <TouchableOpacity style={styles.connectButton} onPress={handleConnectWallet}>
                        <Text style={styles.connectButtonText}>
                            {isConnected ? `Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Connect Wallet"}
                        </Text>
                    </TouchableOpacity>

                    {/* Message Display with Copy Button */}
                    {message && (
                        <View style={styles.copyContainer}>
                            <Text style={styles.messageText}>Message: {message}</Text>
                            <TouchableOpacity onPress={() => copyToClipboard(message)}>
                                <Ionicons name="copy-outline" size={24} color="blue" />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Token Display with Copy Button */}
                    {token && (
                        <View style={styles.copyContainer}>
                            <Text style={styles.tokenText}>
                                Authorization Token: {token.substring(0, 20)}...
                            </Text>
                            <TouchableOpacity onPress={() => copyToClipboard(token)}>
                                <Ionicons name="copy-outline" size={24} color="blue" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Enter text"
                        onChangeText={handleTextChange}
                        value={text}
                    />
                   
                        <TouchableOpacity
                            style={styles.signButton}
                            onPress={() => signText(text)}
                        >
                            <Text style={styles.signButtonText}>Sign Text</Text>
                        </TouchableOpacity>
                        {signed && <Text style={styles.messageText}>Text signed successfully!</Text>}
                </View>

                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            selectedTab === "Collection" && styles.activeTab,
                        ]}
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
                    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
                ]}
                explorerExcludedWalletIds={"ALL"}
                projectId={projectId}
                providerMetadata={providerMetadata}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
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
        paddingBottom: 80,
    },
    profileCard: {
        alignItems: "center",
        padding: 16,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 8,
    },
    buttonGroup: {
        flexDirection: "row",
        marginTop: 8,
    },
    smallButton: {
        backgroundColor: "#1B5E20",
        padding: 6,
        margin: 5,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 12,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        marginTop: 16,
    },
    stat: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 16,
        fontWeight: "bold",
    },
    statLabel: {
        fontSize: 12,
        color: "gray",
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },
    tab: {
        padding: 10,
        marginHorizontal: 20,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: "#79D7BE",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    artGrid: {
        padding: 10,
    },
    artCard: {
        flex: 1,
        margin: 10,
    },
    artImage: {
        width: "100%",
        height: 100,
        borderRadius: 10,
    },
    artTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
    },
    artActions: {
        flexDirection: "row",
        marginTop: 5,
    },
    viewButton: {
        backgroundColor: "#79D7BE",
        padding: 4,
        borderRadius: 5,
        marginRight: 5,
    },
    musicButton: {
        backgroundColor: "#FFD700",
        padding: 4,
        borderRadius: 5,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 20,
        width: "80%",
        paddingHorizontal: 10,
    },
    signButton: {
        backgroundColor: "#79D7BE",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    signButtonText: {
        color: "white",
        textAlign: "center",
    },
    connectButton: {
        backgroundColor: "#79D7BE",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    connectButtonText: {
        color: "white",
        textAlign: "center",
    },
    messageText: {
        marginTop: 10,
        color: "black",
        marginRight: 10, // Add some spacing between text and button
    },
    tokenText: {
        marginTop: 10,
        color: "black",
        marginRight: 10,
    },
    viewText: {
        color: "white"
    },
    musicText: {
        color: "white"
    },
    copyContainer: {
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Vertically center items
        marginTop: 10,
        width: '80%', // Add this
    },
});

export default AccountScreen;