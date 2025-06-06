import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import Header from "../../components/AccountFlow/Header";

const BuyingScreen = ({ route, navigation }) => {
  const { item } = route.params;
  console.log(item.image);
  const [isBuyPressed, setIsBuyPressed] = useState(false);
  const [isDrawPressed, setIsDrawPressed] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header goBack={true} title="Buy Art" navigation={navigation} />
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.artImage} />

        <View style={styles.infoContainer}>
          <View style={styles.userDetails}>
            <Image
              source={require("../../assets/market/buy.png")}
              style={styles.userAvatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.artTitle}>{item.artistName}</Text>
              <Text style={styles.locationText}>{item.id.slice(0, 15)}..</Text>
            </View>
            <Text style={styles.price}>{item.price} VND</Text>
          </View>

          <Text style={styles.description}>
            This is a beautiful piece of artwork created by {item.username}. A
            perfect addition to your collection.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.buyButton, isBuyPressed && styles.buttonPressed]}
            onPressIn={() => setIsBuyPressed(true)}
            onPressOut={() => setIsBuyPressed(false)}
            onPress={() => navigation.push("CheckoutScreen", { item })}>
            <Text style={styles.buttonText}>Buy now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.drawButton, isDrawPressed && styles.buttonPressed]}
            onPressIn={() => setIsDrawPressed(true)}
            onPressOut={() => setIsDrawPressed(false)}>
            <Text style={styles.buttonText}>New Draw</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  artImage: {
    width: "100%",
    height: 297,
    borderRadius: 10,
    resizeMode: "cover",
  },
  infoContainer: {
    marginTop: 15,
    backgroundColor: "#F6F4F0",
    borderRadius: 15,
    padding: 16,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  artTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2A9D8F",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingBottom: 20,
  },
  buyButton: {
    backgroundColor: "#2A9D8F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  drawButton: {
    backgroundColor: "#777",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  buttonPressed: {
    backgroundColor: "#555",
  },
});

export default BuyingScreen;
