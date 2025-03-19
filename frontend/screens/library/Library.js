import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUserPicture, getToken } from "../../services/apiService";
import Header from "../../components/AccountFlow/Header";

const LibraryScreen = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [userPictures, setUserPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const handleViewButtonPress = () => {
    if (selectedItems.length === 0) {
      Alert.alert("No Selection", "Please select an artwork first.");
      return;
    }
    // Get the selected artwork (only the first selected item for now)
    const selectedArtwork = userPictures.find(
      (item) => item.id === selectedItems[0]
    );

    if (selectedArtwork) {
      navigation.navigate("ArtworkDetail", { artwork: selectedArtwork });
    }
  };
  useEffect(() => {
    const fetchTokenAndPictures = async () => {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          setToken(storedToken);
          await loadUserPictures(storedToken);
        } else {
          Alert.alert("Error", "No token found. Please log in again.");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to retrieve token.");
      }
    };
    fetchTokenAndPictures();
  }, []);

  const loadUserPictures = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserPicture(token);
      const pictures = response.pictures.map((item, index) => ({
        id: index.toString(),
        address: item.address,
        token: item.token,
        url: item.url,
        visibility: item.visibility,
      }));
      print(token);
      setUserPictures(pictures);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDrawPress = () => {
    navigation.navigate("NewArt");
  };

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selectedItems.includes(item.id) && styles.selectedCard,
      ]}
      onPress={() => toggleSelection(item.id)}>
      <Image source={{ uri: item.url }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>Token: {item.token.slice(0, 6)}...</Text>
      <Text style={styles.cardSubtitle}>Visibility: {item.visibility}</Text>

      {selectedItems.includes(item.id) && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color="#79D7BE"
          style={styles.checkIcon}
        />
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#79D7BE" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={() => loadUserPictures(token)}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Library | Setting" />

      {/* Artwork Grid */}
      <FlatList
        data={userPictures} // Updated to use parsed state
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton} onPress={handleDrawPress}>
          <Text style={styles.bottomText}>New art</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleViewButtonPress}>
          <Text style={styles.bottomText}>View</Text>
          <Ionicons name="arrow-forward" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#79D7BE",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  grid: {
    paddingBottom: 80,
  },
  card: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    margin: 8,
    padding: 10,
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#79D7BE",
  },
  cardImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  checkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#79D7BE",
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: "black",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LibraryScreen;
