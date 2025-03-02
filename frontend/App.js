import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './screens/ExploreScreen';
import AccountScreen from './screens/AccountScreen';
import MarketScreen from './screens/MarketScreen';
import BuyingScreen from './screens/BuyingScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import LibraryScreen from './screens/Library';
import CameraScreen from './screens/CameraScreen';
import ArtworkDetailScreen from './screens/ArtworkDetailScreen';
import PublishBuyScreen from './screens/PublishScreen_buy'; // Updated name to follow camelCase
import GenerateArtScreen from './screens/GenerateArtScreen';
import LoadingGenArt from './screens/LoadingGenArt'; 
import ResultGenArt from './screens/ResultGenArt';
import CanvasSizeScreen from './screens/CanvasSizeScreen';
import ReportScreen from './screens/ReportScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import NoResultsScreen from './screens/NotFound';
import Uploading from './screens/UploadScreen';
import OwnershipScreen from './screens/OwnershipScreen';
import ExploreIcon from './assets/home/explore.png';
import AccountIcon from './assets/home/person_2.png';
import MarketIcon from './assets/home/add_business.png';
import LibraryIcon from './assets/home/Library.png';
import CameraIcon from './assets/home/scan.png';

import { LibraryProvider } from './components/LibraryContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// **Market Stack**
const MarketStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MarketOverview" component={MarketScreen} options={{ headerShown: false }} />
    <Stack.Screen 
      name="BuyingScreen" 
      component={BuyingScreen} 
      options={{ title: 'Buying', headerStyle: { backgroundColor: '#79D7BE' }, headerTintColor: 'black', headerTitleAlign: 'center' }} 
    />
    <Stack.Screen 
      name="CheckoutScreen" 
      component={CheckoutScreen} 
      options={{ title: 'Checkout', headerStyle: { backgroundColor: '#79D7BE' }, headerTintColor: 'black', headerTitleAlign: 'center' }} 
    />
  </Stack.Navigator>
);

// **Library Stack**
const LibraryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="LibraryOverview" component={LibraryScreen} options={{ headerShown: false }} />
    <Stack.Screen 
      name="ArtworkDetail" 
      component={ArtworkDetailScreen} 
      options={{ title: 'Artwork Details', headerStyle: { backgroundColor: '#79D7BE' }, headerTintColor: 'black', headerTitleAlign: 'center' }} 
    />
    <Stack.Screen 
      name="PublishArtwork" 
      component={PublishBuyScreen} 
      options={{ title: 'Publish Artwork', headerStyle: { backgroundColor: '#79D7BE' }, headerTintColor: 'black', headerTitleAlign: 'center' }} 
    />
  </Stack.Navigator>
);

// **Main Tab Navigator**
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ size }) => renderIcon(route.name, size),
      tabBarActiveTintColor: '#00BFFF',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#E0FFFF' },
    })}
  >
    <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Market" component={MarketStack} options={{ headerShown: false }} />
    <Tab.Screen name="Library" component={LibraryStack} options={{ headerShown: false }} />
    <Tab.Screen 
      name="CameraScreen" 
      component={CameraScreen} 
      options={{ title: 'Search', headerStyle: { backgroundColor: '#79D7BE' }, headerTintColor: 'black', headerTitleAlign: 'center' }} 
    />
    <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

// **Main App Navigation**
export default function App() {
  return (
    <LibraryProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Main Tabs */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
          {/* Additional Screens */}
          <Stack.Screen 
          name="Ownership" 
          component={OwnershipScreen} 
          options={{ 
            headerShown: true, 
            title: 'Ownership', 
            headerStyle: { backgroundColor: '#79D7BE' }, 
            headerTintColor: 'black', 
            headerTitleAlign: 'center' }} />
          <Stack.Screen name="NotFound" component={NoResultsScreen} />
          <Stack.Screen 
            name="GenerateArtScreen" 
            component={GenerateArtScreen} 
            options={{ 
              headerShown: true, 
              title: "Generate Art", 
              headerStyle: { backgroundColor: '#79D7BE' }, 
              headerTintColor: "black",
              headerTitleAlign: "center",
            }} 
          />
          <Stack.Screen 
            name="LoadingGenArt" 
            component={LoadingGenArt} 
          />
          <Stack.Screen 
            name="CanvasSizeScreen" 
            component={CanvasSizeScreen} 
            options={{ 
              headerShown: true, 
              title: "Canvas Size", 
              headerStyle: { backgroundColor: '#79D7BE' }, 
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
              headerStyle: { backgroundColor: '#79D7BE' }, 
              headerTintColor: 'black', 
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen 
            name="SearchResultsScreen" 
            component={SearchResultsScreen} 
            options={{ 
              headerShown: true, 
              title: "Search Results", 
              headerStyle: { backgroundColor: '#79D7BE' }, 
              headerTintColor: 'black', 
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen
            name="UploadScreen" 
            component={Uploading}
            options={{ 
              headerShown: true, 
              title: "Upload", // Added title for clarity
              headerStyle: { backgroundColor: '#79D7BE' }, 
              headerTintColor: 'black', 
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen 
            name="ResultGenArt" 
            component={ResultGenArt} 
            options={{ 
              headerShown: true, 
              title: "Generated Artwork", 
              headerStyle: { backgroundColor: '#79D7BE' }, 
              headerTintColor: 'black', 
              headerTitleAlign: 'center'
            }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </LibraryProvider>
  );
}

// **Icon Renderer for Bottom Tabs**
const renderIcon = (routeName, size) => {
  const icons = {
    Explore: ExploreIcon,
    Account: AccountIcon,
    Market: MarketIcon,
    Library: LibraryIcon,
    CameraScreen: CameraIcon,
  };
  return <Image source={icons[routeName]} style={{ width: size, height: size }} />;
};