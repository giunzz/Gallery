import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "../../components/Card";
import Header from "../../components/Header";

import ColorImage from "../../assets/home/Color.png";
import ShopImage from "../../assets/home/Shop.png";
import GenArt from "../../assets/home/Gallery Add.png";
import UpgradeIcon from "../../assets/home/Ellipse.png";
import ProfilePic from "../../assets/home/ava.png";
import { NewsExplore, getToken } from "../../services/apiService";

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
      <Image
        source={{ uri: imageSource }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.artTitle}>{title}</Text>
      <Text style={styles.artistName}>{artistName}</Text>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() =>
            navigation.navigate("ReportScreen", {
              artwork: {
                title,
                artistName,
                imageUrl: imageSource, // ✅ Ensure the correct image property is sent
              },
            })
          }>
          <Text style={styles.reportText}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchTokenAndPictures = async () => {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          setToken(storedToken);
          await loadNewsData(storedToken);
        } else {
          Alert.alert("Error", "No token found. Please log in again.");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to retrieve token.");
      }
    };
    fetchTokenAndPictures();
  }, []);

  const loadNewsData = async (token) => {
    try {
      const response = await NewsExplore(token);
      const pictures = response.pictures.map((item) => ({
        id: item.token,
        title: item.token.slice(0, 6), // Display first 6 characters of token
        artistName: item.address, // Use `address` as artist name
        image: item.url, // Use `url` for the image
      }));
      setNewsData(pictures);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate("SearchResultsScreen", { searchQuery });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserHeader />

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}>
        {/* Top Card */}
        <View style={styles.topCardContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("NewArt")}>
            <Card
              title="New Art"
              imageSource={ColorImage}
              style={styles.topCard}
              visual={require("../../assets/home/guitar.png")}>
              <Text style={styles.cardSubtitle}>
                Let's see what can I do for you?
              </Text>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Middle Cards */}
        <View style={styles.middleCardContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("GenerateArtScreen")}
            style={styles.middleCard}>
            <Card
              title="Generate Picture"
              imageSource={GenArt}
              style={styles.generateCard}
              visualsmal={require("../../assets/home/chat.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Market")}
            style={styles.middleCard}>
            <Card
              title="Exploring Market"
              imageSource={ShopImage}
              style={styles.marketCard}
              visualsmal={require("../../assets/home/megaphone.png")}
            />
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
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Newfeed Art Loop */}
        <Text style={styles.sectionTitle}>Newfeed Art</Text>
        <FlatList
          data={newsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NewfeedArt
              imageSource={item.image}
              title={item.title}
              artistName={item.artistName}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFF",
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 18,
    color: "gray",
  },
  upgradeButton: {
    backgroundColor: "#79D7BE",
    paddingVertical: 8,
    paddingHorizontal: 12,
    right: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
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
  topCardContainer: {
    marginBottom: 20,
  },
  topCard: {
    backgroundColor: "#F7BB36",
    padding: 25,
    borderRadius: 20,
    height: 180,
    position: "relative",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    width: "100%",
    bottom: 1000,
  },
  cardVisual: {
    width: 95,
    height: 150,
    position: "relative",
    bottom: 1000,
  },
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
    position: "relative",
  },
  marketCard: {
    backgroundColor: "#7851A9",
    padding: 20,
    borderRadius: 20,
    height: 120,
    position: "relative",
  },
  cardVisualSmall: {
    width: 20,
    height: 30,
    right: 20,
    bottom: 20,
    top: 200,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
  },
  newfeedCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  artTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  artistName: {
    fontSize: 16,
    color: "gray",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  reportButton: {
    backgroundColor: "#E57373",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  reportText: {
    color: "white",
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#FF5722", // Red color for clear button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  newfeedCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  artTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  artistName: {
    fontSize: 16,
    color: "gray",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  reportButton: {
    backgroundColor: "#E57373",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  reportText: {
    color: "white",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
  },
});

export default ExploreScreen;
