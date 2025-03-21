import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Screens
import { LibraryProvider } from "./components/LibraryContext"; // Assuming this is the correct path
import AppNavigator from "./navigation/AppNavigator";

// Main App Navigation
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor={"#79D7BE"} />
        <LibraryProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </LibraryProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
