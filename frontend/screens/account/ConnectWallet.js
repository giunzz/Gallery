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
  ToastAndroid,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import { PROJECT_ID } from "@env";
import {
  getMessageFromServer,
  getAuthorizationToken,
} from "../../services/apiService"; // and this one
import Header from "../../components/AccountFlow/Header";

const projectId = PROJECT_ID;

const providerMetadata = {
  name: "Gallery",
  description: "Art creation and sharing platform",
  url: "https://gallery-app.com", //  example URL
  icons: ["https://gallery-app.com/logo.png"], // example URL
  redirect: {
    native: "galleryapp://", //  app scheme
    universal: "https://gallery-app.com", //  universal link
  },
};

const ConnectWallet = ({ navigation }) => {
  const { open, isConnected, address, provider, close } =
    useWalletConnectModal();
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

      // We move the logic *after* the connection check.
      const userAddress = address;
      const serverMessage = await getMessageFromServer(userAddress);
      setMessage(serverMessage);
    } catch (error) {
      console.error("Error in wallet connection flow:", error);
      Alert.alert("Error", "Failed to connect wallet or obtain message."); // More specific error
    }
  }, [isConnected, open, address]); // Correct dependencies

  const handleSignMessage = useCallback(async () => {
    if (!isConnected || !address) {
      Alert.alert("Error", "Wallet not connected.");
      return;
    }
    try {
      const userAddress = address;
      const serverMessage = await getMessageFromServer(userAddress); // Fetching Message from server
      setMessage(serverMessage);
      const signature = await provider.request({
        method: "personal_sign",
        params: [serverMessage, userAddress],
      });
      const authToken = await getAuthorizationToken(
        userAddress,
        serverMessage,
        signature
      );
      setToken(authToken);
      console.log("Token received:", authToken);
      Alert.alert("Success", "Wallet connected and token received!");
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to connect wallet or obtain token.");
    }
  }, [isConnected, address, provider]);

  const signText = async (textToSign) => {
    try {
      if (textToSign === "") throw new Error("Text is empty");
      if (!isConnected || !address) throw new Error("Wallet is not connected");

      const signature = await provider.request({
        method: "personal_sign",
        params: [textToSign, address],
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
    //  don't automatically connect, wait for user interaction
    if (isConnected) {
      handleSignMessage();
    }
  }, [isConnected, handleSignMessage]);

  useEffect(() => {
    if (message) {
      copyToClipboard(message);
    }
  }, [message]);

  const copyToClipboard = async (textToCopy) => {
    await Clipboard.setStringAsync(textToCopy);
    if (Platform.OS === "android") {
      ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Copied", "Text copied to clipboard!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header goBack={true} navigation={navigation} title={"Connect Wallet"} />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Image
            source={require("../../assets/home/ava.png")} // Corrected path, make sure the image exists
            style={styles.profileImage}
          />
          <Text style={styles.titleText}>
            Create your art, create your story
          </Text>
          {/*  MetaMask Button *always* present */}
          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleConnectWallet}>
            <View style={styles.buttonContent}>
              <Image
                source={require("../../assets/metamask.png")}
                style={styles.metamaskLogo}
              />
              <Text style={styles.connectButtonText}>
                {isConnected
                  ? `Connected: ${address.substring(
                      0,
                      6
                    )}...${address.substring(address.length - 4)}`
                  : "Metamask"}
              </Text>
            </View>
          </TouchableOpacity>

          {message && (
            <View style={styles.copyContainer}>
              <Text style={styles.messageText}>Message: {message}</Text>
            </View>
          )}

          <Text style={styles.inputLabel}>Let sign your text here:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter text"
            onChangeText={handleTextChange}
            value={message}
          />
          <TouchableOpacity
            style={styles.signButton}
            onPress={() => signText(message)}>
            <Text style={styles.signButtonText}>Sign Text</Text>
          </TouchableOpacity>
          {signed && (
            <Text style={styles.messageText}>Text signed successfully!</Text>
          )}
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
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#79D7BE", // Header background
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  profileCard: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#4DA1A9",
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 8,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#F8F8F8",
  },
  connectButton: {
    backgroundColor: "#F8F8F8", // Blue button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center items vertically
    justifyContent: "center", // Center items horizontally in the button
  },
  connectButtonText: {
    color: "black",
    textAlign: "center",
    marginLeft: 8,
  },
  metamaskLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
    color: "#E0FFFF",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    width: "90%",
    paddingHorizontal: 10,
    borderRadius: 8, // Rounded corners
    backgroundColor: "#fff", // White input background
  },
  inputLabel: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 16,
    fontWeight: "bold",
    color: "#ffff",
  },
  signButton: {
    backgroundColor: "#000000",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    width: "90%",
    alignItems: "center",
  },
  signButtonText: {
    color: "white",
    textAlign: "center",
  },
  copyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0", // Light gray background for the message/token area
    borderRadius: 8,
    width: "90%",
  },
  messageText: {
    color: "black",
    marginRight: 10,
    flex: 1, // Let the text take up available space
    flexWrap: "wrap",
  },
  tokenText: {
    marginRight: 10,
    flex: 1,
    flexWrap: "wrap",
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "gray",
  },
  activeNavText: {
    color: "black", // Different color for active tab
    fontWeight: "bold",
  },
});

export default ConnectWallet;
