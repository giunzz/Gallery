import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    Alert,
    Clipboard,
    ToastAndroid,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
    WalletConnectModal,
    useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import config from "../../config.js";
import { getMessageFromServer, getAuthorizationToken } from "../../services/apiService";

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

const ConnectWallet = ({ navigation }) => {
    const { open, isConnected, address, provider, close } = useWalletConnectModal();
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [signed, setSigned] = useState(false);

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
            const signature = await provider.request({
                method: "personal_sign",
                params: [serverMessage, userAddress],
            });
            const authToken = await getAuthorizationToken(userAddress, serverMessage, signature);
            setToken(authToken);
            Alert.alert("Success", "Wallet connected and token received!");
        } catch (error) {
            console.error("Error in wallet connection flow:", error);
            Alert.alert("Error", "Failed to connect wallet or obtain token.");
        }
    }, [isConnected, open, address, provider]);

    const signText = async (text) => {
        try {
            if (text === "") throw new Error("Text is empty");
            if (!isConnected) throw new Error("Wallet is not connected");

            const message = text;
            const signature = await provider.request({
                method: "personal_sign",
                params: [message, address],
            });
            Alert.alert("Success", "Text signed successfully!");
            setSigned(true);
            return signature;
        } catch (error) {
            console.error("Signing failed:", error);
            Alert.alert("Error", "Signing failed: " + error.message);
            return null;
        }
    };

    useEffect(() => {
        if (isConnected) {
            handleConnectWallet();
        }
    }, [isConnected, handleConnectWallet]);

    const copyToClipboard = async (textToCopy) => {
        await Clipboard.setString(textToCopy);
        if (Platform.OS === 'android') {
            ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
        } else {
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
                        source={require("../../assets/home/ava.png")}
                        style={styles.profileImage}
                    />
                    <Text style={styles.username}>@Jane</Text>
                    <Ionicons name="shield-checkmark" size={16} color="gold" />

                    <TouchableOpacity style={styles.connectButton} onPress={handleConnectWallet}>
                        <Text style={styles.connectButtonText}>
                            {isConnected ? `Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Connect Wallet"}
                        </Text>
                    </TouchableOpacity>

                    {message && (
                        <View style={styles.copyContainer}>
                            <Text style={styles.messageText}>Message: {message}</Text>
                            <TouchableOpacity onPress={() => copyToClipboard(message)}>
                                <Ionicons name="copy-outline" size={24} color="blue" />
                            </TouchableOpacity>
                        </View>
                    )}

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
    copyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: '80%',
    },
    messageText: {
        marginTop: 10,
        color: "black",
        marginRight: 10,
    },
    tokenText: {
        marginTop: 10,
        color: "black",
        marginRight: 10,
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
});

export default ConnectWallet;