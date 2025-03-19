import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import Header from "../../components/AccountFlow/Header";
import { Ionicons } from "@expo/vector-icons";

// Dummy Data for Collection
const collectionData = [
  { id: "1", title: "Looking", image: require("../../assets/home/art.png") },
  { id: "2", title: "Dreamy", image: require("../../assets/home/art.png") },
  { id: "3", title: "Surreal", image: require("../../assets/home/art.png") },
];
const activityData = [];

// New header component
const ProfileHeader = ({ navigation, selectedTab, setSelectedTab }) => (
  <>
    <View style={styles.profileCard}>
      <Image
        source={require("../../assets/home/ava.png")}
        style={styles.profileImage}
      />
      <Text style={styles.username}>@Jane</Text>
      <Ionicons
        name="shield-checkmark"
        size={16}
        color="gold"
        style={styles.verifiedBadge}
      />

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => navigation.navigate("VerifyArtist")}>
          <Text style={styles.buttonText}>Edit account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallButtonDark}
          onPress={() => navigation.navigate("ConnectWallet")}>
          <Text style={styles.buttonText}>Connect wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => navigation.navigate("UserAgreement")}
          disabled={true}>
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
    </View>

    <View style={styles.tabs}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === "Collection" && styles.activeTab]}
        onPress={() => setSelectedTab("Collection")}>
        <Text style={styles.tabText}>Collection</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === "Activity" && styles.activeTab]}
        onPress={() => setSelectedTab("Activity")}>
        <Text style={styles.tabText}>Activity</Text>
      </TouchableOpacity>
    </View>
  </>
);

const ProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Collection");

  // Render Item for artCards used by both lists
  const renderArtCard = ({ item }) => (
    <View style={styles.artCard}>
      <Image source={item.image} style={styles.artImage} />
      <Text style={styles.artTitle}>{item.title}</Text>
      <View style={styles.artActions}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.musicButton}>
          <Text style={styles.musicText}>Listen music</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={"Account"} />
      {selectedTab === "Collection" ? (
        <FlatList
          ListHeaderComponent={
            <ProfileHeader
              navigation={navigation}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          }
          data={collectionData}
          renderItem={renderArtCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.artGrid}
        />
      ) : (
        <FlatList
          ListHeaderComponent={
            <ProfileHeader
              navigation={navigation}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          }
          data={activityData}
          renderItem={renderArtCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.artGrid}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>There is nothing here.</Text>
            </View>
          }
        />
      )}
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
    backgroundColor: "#79D7BE",
  },
  headerIcons: {
    flexDirection: "row",
    top: 8,
  },
  icon: {},
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
  verifiedBadge: {
    marginLeft: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 8,
  },
  smallButton: {
    backgroundColor: "#79D7BE",
    padding: 8,
    margin: 5,
    borderRadius: 8,
  },
  smallButtonDark: {
    backgroundColor: "#1B5E20",
    padding: 8,
    margin: 5,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
});

export default ProfileScreen;
