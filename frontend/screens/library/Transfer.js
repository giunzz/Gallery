import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import {
  getToken,
  transferArt,
} from "../../services/apiService";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWalletConnectModal } from "@walletconnect/modal-react-native"; 
import Header from "../../components/AccountFlow/Header";

const TransferArtScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params || {};
  const imageUrl = item?.imageUrl;

  const { isConnected, address, provider } = useWalletConnectModal();

  const [recipientAddress, setRecipientAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const handleTransfer = async () => {
    if (!imageUrl) {
      Alert.alert("Error", "No image found for this artwork.");
      return;
    }

    setIsLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "Authorization token is missing.");
        return;
      }

      if (!isValidAddress(recipientAddress)) {
        Alert.alert("Error", "Invalid recipient address.");
        return;
      }

      const response = await transferArt(token, item.token, recipientAddress);
      console.log(response);

      if (response.msg === "Completed") {
        const signedMessage = await signText(
          `Transfer of ${item.token} to ${recipientAddress}`,
          provider,
          address
        );

        if (signedMessage) {
          setModalVisible(true); // Show custom modal
        } else {
          Alert.alert("Error", "Failed to sign the message.");
        }

        navigation.navigate("MainTabs", { screen: "Library" });
      } else {
        Alert.alert("Error", response.message || "Failed to transfer art.");
      }
    } catch (error) {
      console.error("Error transferring art:", error);
      Alert.alert(
        "Error",
        error?.message || "An error occurred while transferring the art."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signText = async (textToSign, provider, address) => {
    try {
      if (textToSign === "") throw new Error("Text is empty");
      if (!isConnected || !address) throw new Error("Wallet is not connected");

      const signature = await provider.request({
        method: "personal_sign",
        params: [textToSign, address],
      });
      return signature;
    } catch (error) {
      console.error("Signing failed:", error);
      Alert.alert("Error", "Signing failed: " + error.message);
      return null;
    }
  };

  const isValidAddress = (address) => {
    return address.trim().length > 5;
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        goBack={true}
        title={"Transfer Ownership"}
        navigation={navigation}
        icon={false}
      />
      <View style={styles.container}>
        <Image
          source={{ uri: imageUrl }} 
          style={styles.image}
        />
        <Text style={styles.tokenInfo}>Token: {item?.token}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter recipient address</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.input}
              value={recipientAddress}
              onChangeText={setRecipientAddress}
              placeholder="Enter recipient address"
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setRecipientAddress("")}>
              <Text style={styles.clearButtonText}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleTransfer}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirm</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Custom Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>✅ Transfer Success!</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF2",
    padding: 20,
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tokenInfo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: "#333",
    fontSize: 16,
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#000",
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 5,
    padding: 8,
    backgroundColor: "#465E6E",
    borderRadius: 20,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2A9D8F",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#B0B0B0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  okButton: {
    backgroundColor: "#2A9D8F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TransferArtScreen;