import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/AccountFlow/Header";
const ReportScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { artwork } = route.params || {}; // Get artwork data from route parameters

  const [selectedReason, setSelectedReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const handleNext = () => {
    console.log("Selected Reason:", selectedReason);
    setModalVisible(true); // Show the modal when "Next" is pressed
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Report Artwork"
        goBack={true}
        navigation={navigation}
        icon={false}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: artwork.imageUrl || "../assets/home/art.png" }}
          style={styles.artworkImage}
          resizeMode="cover"
        />

        {/* Artwork Info */}
        <View style={styles.profileCard}>
          <Text style={styles.NameArt}>{artwork.title || "Untitled"}</Text>
          <Text style={styles.artistName}>
            {artwork.artistName || "Unknown Artist"}
          </Text>
        </View>

        <View style={styles.reasonContainer}>
          <TouchableOpacity
            onPress={() => setSelectedReason("Copyright Violation")}>
            <Text
              style={[
                styles.reasonText,
                selectedReason === "Copyright Violation" &&
                  styles.selectedReason,
              ]}>
              Copyright Violation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedReason("Inappropriate Content")}>
            <Text
              style={[
                styles.reasonText,
                selectedReason === "Inappropriate Content" &&
                  styles.selectedReason,
              ]}>
              Inappropriate Content
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedReason("Poor Quality")}>
            <Text
              style={[
                styles.reasonText,
                selectedReason === "Poor Quality" && styles.selectedReason,
              ]}>
              Poor Quality
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="More: Type here..."
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
          />
        </View>

        <Button title="Next" onPress={handleNext} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.checkmarkContainer}>
                <Text style={styles.checkmark}>✔️</Text>
              </View>
              <Text style={styles.modalText}>Thank you for your report!!</Text>
              <TouchableOpacity
                style={styles.okButton}
                onPress={handleModalClose}>
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allows the ScrollView to grow
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  artworkImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  NameArt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  artistName: {
    color: "#888",
    fontSize: 16,
  },
  reasonContainer: {
    marginBottom: 20,
  },
  reasonText: {
    fontSize: 16,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedReason: {
    backgroundColor: "#79D7BE",
    color: "#ffffff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Make it circular
    marginBottom: 10, // Space between avatar and text
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  checkmarkContainer: {
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 40,
    color: "green",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: "#79D7BE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    color: "white",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#79D7BE",
    paddingVertical: 10,
    alignItems: "center",
  },
});

export default ReportScreen;
