import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getToken, buyArt } from "../../services/apiService";

const CheckoutScreen = ({ route, navigation }) => {
  const { item } = route.params;
  console.log(item);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentMethods = [
    {
      id: "Mastercard",
      name: "Master Card",
      image: require("../../assets/payments/mastercard.png"),
    },
    {
      id: "Visa",
      name: "Visa Card",
      image: require("../../assets/payments/visa.png"),
    },
    {
      id: "VNPay",
      name: "VNPay",
      image: require("../../assets/payments/vnpay.png"),
    },
  ];

  const handleCheckout = async () => {
    if (!selectedPayment) {
      Alert.alert("Please select a payment method");
      return;
    }

    const paymentSuccessful = true; // Replace with actual payment logic
    if (paymentSuccessful) {
      try {
        const token = await getToken();
        if (!token) {
          Alert.alert("Authorization token is missing");
          return;
        }

        const response = await buyArt(token, item.id);
        if (response) {
          Alert.alert("Buying successful!");
          navigation.navigate("MainTabs", { screen: "Library" }); // Ensure this navigation structure exists
        } else {
          Alert.alert("Failed to purchase art");
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        Alert.alert("An error occurred. Please try again.");
      }
    } else {
      Alert.alert("Payment failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Artwork Info */}
      <View style={styles.artworkContainer}>
        <Image source={{ uri: item.image }} style={styles.artImage} />
        <View>
          <Text style={styles.artTitle}>{item.title}</Text>
          <Text style={styles.artist}>By {item.artistName}</Text>{" "}
          {/* Use artistName instead of username */}
        </View>
        <Text style={styles.price}>{item.price} VND</Text>
      </View>

      {/* Payment Section */}
      <Text style={styles.paymentTitle}>Select Payment Method</Text>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentOption,
            selectedPayment === method.id && styles.selectedPayment,
          ]}
          onPress={() => setSelectedPayment(method.id)}>
          <Image source={method.image} style={styles.paymentIcon} />
          <Text style={styles.paymentText}>{method.name}</Text>
          <Ionicons
            name={
              selectedPayment === method.id
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={20}
            color="#2A9D8F"
          />
        </TouchableOpacity>
      ))}

      {/* Total Section */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>{item.price} VND</Text>
      </View>
      <Text style={styles.taxText}>Tax included</Text>

      {/* Checkout Button */}
      <TouchableOpacity
        style={[
          styles.checkoutButton,
          { backgroundColor: selectedPayment ? "#2A9D8F" : "#ccc" },
        ]}
        disabled={!selectedPayment}
        onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  artworkContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 15,
    marginTop: 20,
  },
  artImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  artTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2A9D8F",
    marginLeft: "auto",
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: "#f9f9f9", // Light gray background for options
    paddingHorizontal: 10,
  },
  selectedPayment: {
    backgroundColor: "#D1F0E8", // Highlight selected payment method
  },
  paymentIcon: {
    width: 40,
    height: 30,
    marginRight: 10,
  },
  paymentText: {
    fontSize: 16,
    flex: 1,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2A9D8F",
  },
  taxText: {
    fontSize: 12,
    color: "gray",
    textAlign: "right",
  },
  checkoutButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
