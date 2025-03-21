import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

// Screens
import AccountNav from "./AccountNav";
import MarketNav from "./MarketNav";
import LibraryNav from "./LibraryNav";
import ExploreNav from "./ExploreNav";
import ScanNav from "./ScanNav";
import NoResultsScreen from "../screens/scan/NotFound";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      component={ExploreNav}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Market"
      component={MarketNav}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Library"
      component={LibraryNav}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="CameraScreen"
      component={ScanNav}
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
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="NotFound" component={NoResultsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
