import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Screens
import ExploreScreen from "./screens/explore/ExploreScreen";
import AccountScreen from "./screens/account/AccountScreen";
import MarketScreen from "./screens/market/MarketScreen";
import BuyingScreen from "./screens/market/BuyingScreen";
import CheckoutScreen from "./screens/market/CheckoutScreen";
import LibraryScreen from "./screens/library/Library";
import CameraScreen from "./screens/scan/CameraScreen";
import ArtworkDetailScreen from "./screens/library/ArtworkDetailScreen";
import PublishBuyScreen from "./screens/library/PublishScreen_buy";
import GenerateArtScreen from "./screens/explore/GenerateArtScreen";
import LoadingGenArt from "./screens/explore/LoadingGenArt";
import ResultGenArt from "./screens/explore/ResultGenArt";
import CanvasSizeScreen from "./screens/explore/CanvasSizeScreen";
import ReportScreen from "./screens/explore/ReportScreen";
import NewArt from "./screens/library/NewArt";
import Transfer from "./screens/Transfer";
import ResultDraw from "./screens/library/Result_Draw";
import SearchResultsScreen from "./screens/explore/SearchResultsScreen";
import NoResultsScreen from "./screens/scan/NotFound";
import Uploading from "./screens/scan/UploadScreen";
import MusicArt from "./screens/library/MusicArt";
import OwnershipScreen from "./screens/OwnershipScreen";
import VerifyArtist from "./screens/account/EditAccount"; // Assuming this is the correct path
import UserAgreement from "./screens/account/UserAgreement"; // Assuming this is the correct path
import ConnectWallet from "./screens/account/ConnectWallet";
import { LibraryProvider } from "./components/LibraryContext"; // Assuming this is the correct path

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Market Stack
const MarketStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MarketOverview"
      component={MarketScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="BuyingScreen"
      component={BuyingScreen}
      options={{
        title: "Buying",
        headerStyle: { backgroundColor: "#79D7BE" },
        headerTintColor: "black",
        headerTitleAlign: "center",
      }}
    />
    <Stack.Screen
      name="CheckoutScreen"
      component={CheckoutScreen}
      options={{
        title: "Checkout",
        headerStyle: { backgroundColor: "#79D7BE" },
        headerTintColor: "black",
        headerTitleAlign: "center",
      }}
    />
  </Stack.Navigator>
);

// Library Stack
const LibraryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LibraryOverview"
      component={LibraryScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ArtworkDetail"
      component={ArtworkDetailScreen}
      options={{
        title: "Artwork Details",
        headerStyle: { backgroundColor: "#79D7BE" },
        headerTintColor: "black",
        headerTitleAlign: "center",
      }}
    />
    <Stack.Screen
      name="PublishArtwork"
      component={PublishBuyScreen}
      options={{
        title: "Publish Artwork",
        headerStyle: { backgroundColor: "#79D7BE" },
        headerTintColor: "black",
        headerTitleAlign: "center",
      }}
    />
  </Stack.Navigator>
);

// Account Stack
const AccountNav = () => {
  const AccountStack = createStackNavigator();
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="VerifyArtist"
        component={VerifyArtist}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="UserAgreement"
        component={UserAgreement}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="ConnectWallet"
        component={ConnectWallet}
        options={{ headerShown: false }}
      />
    </AccountStack.Navigator>
  );
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Explore") {
          iconName = focused ? "compass" : "compass-outline";
        } else if (route.name === "Market") {
          iconName = focused ? "albums" : "albums-outline";
        } else if (route.name === "Library") {
          iconName = focused ? "library" : "library-outline";
        } else if (route.name === "CameraScreen") {
          iconName = focused ? "scan" : "scan-outline";
        } else if (route.name === "Account") {
          iconName = focused ? "person" : "person-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "black", // Active tab icon color
      tabBarInactiveTintColor: "gray", // Inactive tab icon color
      tabBarStyle: { backgroundColor: "#E0FFFF" }, // Tab bar background color
    })}>
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Market"
      component={MarketStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Library"
      component={LibraryStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="CameraScreen"
      component={CameraScreen}
      options={{
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountNav}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

// Main App Navigation
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor={"#79D7BE"} />
        <LibraryProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* Main Tabs */}
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen
                name="Ownership"
                component={OwnershipScreen}
                options={{
                  headerShown: true,
                  title: "Ownership",
                  headerStyle: { backgroundColor: "#79D7BE" },
                  headerTintColor: "black",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen name="NotFound" component={NoResultsScreen} />
              <Stack.Screen
                name="GenerateArtScreen"
                component={GenerateArtScreen}
                options={{
                  headerShown: true,
                  title: "Generate Art",
                  headerStyle: { backgroundColor: "#79D7BE" },
                  headerTintColor: "black",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen name="LoadingGenArt" component={LoadingGenArt} />
              <Stack.Screen
                name="CanvasSizeScreen"
                component={CanvasSizeScreen}
                options={{
                  headerShown: true,
                  title: "Canvas Size",
                  headerStyle: { backgroundColor: "#79D7BE" },
                  headerTintColor: "black",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="ReportScreen"
                component={ReportScreen}
                options={{
                  headerShown: true,
                  title: "Report Artwork",
                  headerStyle: { backgroundColor: "#79D7BE" },
                  headerTintColor: "black",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="SearchResultsScreen"
                component={SearchResultsScreen}
                options={{
                  headerShown: true,
                  title: "Search Results",
                  headerStyle: { backgroundColor: "#79D7BE" },
                  headerTintColor: "black",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="UploadScreen"
                component={Uploading}
                options={{
                  headerShown: true,
                  title: "",
                  headerStyle: { backgroundColor: "#79D7BE" },
                  headerTintColor: "black",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="ResultGenArt"
                component={ResultGenArt}
                options={{
                  headerShown: true,
                  title: "Generated Artwork",
                  headerStyle: { backgroundColor: "#79D7BE" },
                  headerTintColor: "black",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="NewArt"
                component={NewArt}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="MusicArt"
                component={MusicArt}
                options={{
                  headerShown: true,
                  title: "Playing Now",
                  headerTintColor: "black",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="Transfer"
                component={Transfer}
                options={{
                  headerShown: true,
                  title: "Transfer Ownership",
                  headerStyle: { backgroundColor: "#79D7BE" },
                  headerTintColor: "black",
                  headerTitleAlign: "center",
                }}
              />

              <Stack.Screen
                name="ResultDraw"
                component={ResultDraw}
                options={{
                  headerShown: true,
                  title: "",
                  headerStyle: { backgroundColor: "#79D7BE" },
                  headerTintColor: "black",
                  headerTitleAlign: "center",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </LibraryProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
