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
import Publish_buy from './screens/PublishScreen_buy';

import ExploreIcon from './assets/home/explore.png';
import AccountIcon from './assets/home/person_2.png';
import MarketIcon from './assets/home/add_business.png';
import LibraryIcon from './assets/home/Library.png';
import CameraIcon from './assets/home/scan.png';

import { LibraryProvider } from './screens/LibraryContext'; // Corrected import

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MarketStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Market" component={MarketScreen} options={{ headerShown: false }} />
    <Stack.Screen 
      name="Buying" 
      component={BuyingScreen} 
      options={{ title: 'Buying', headerStyle: { backgroundColor: '#79D7BE' }, headerTintColor: 'black', headerTitleAlign: 'center' }} 
    />
    <Stack.Screen 
      name="Checkout" 
      component={CheckoutScreen} 
      options={{ title: 'Checkout', headerStyle: { backgroundColor: '#79D7BE' }, headerTintColor: 'black', headerTitleAlign: 'center' }} 
    />
  </Stack.Navigator>
);

const LibraryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />
    <Stack.Screen 
      name="ArtworkDetail" 
      component={ArtworkDetailScreen} 
      options={{ title: 'Artwork Details', headerStyle: { backgroundColor: '#79D7BE' }, headerTintColor: 'black', headerTitleAlign: 'center' }} 
    />
    <Stack.Screen 
      name="Publish_buy" 
      component={Publish_buy} 
      options={{ title: 'Publish Artwork', headerStyle: { backgroundColor: '#79D7BE' }, headerTintColor: 'black', headerTitleAlign: 'center' }} 
    />
  </Stack.Navigator>
);

const renderIcon = (routeName, size) => {
  let iconSource;
  switch (routeName) {
    case 'Explore': iconSource = ExploreIcon; break;
    case 'Account': iconSource = AccountIcon; break;
    case 'Market': iconSource = MarketIcon; break;
    case 'Library': iconSource = LibraryIcon; break;
    case 'Camera': iconSource = CameraIcon; break;
    default: iconSource = null;
  }
  return <Image source={iconSource} style={{ width: size, height: size }} />;
};

export default function App() {
  return (
    <LibraryProvider>
      <NavigationContainer>
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
          <Tab.Screen name="Camera" component={CameraScreen} options={{ title: 'Camera', headerStyle: { backgroundColor: '#79D7BE' }, headerTintColor: 'black', headerTitleAlign: 'center' }} />
          <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </LibraryProvider>
  );
}
