import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import AccountScreen from '../screens/AccountScreen';
import MarketScreen from '../screens/MarketScreen';
import BuyingScreen from '../screens/BuyingScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import LibraryScreen from '../screens/Library'; // Import the LibraryScreen
import CameraScreen from '../screens/CameraScreen'; // Import the CameraScreen
import ArtworkDetailScreen from '../screens/ArtworkDetailScreen';  // Import the ArtworkDetailScreen
import Publish_buy from '../screens/PublishScreen_buy'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// MarketStack contains the flow for the "Market" section
const MarketStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
        name="Market" 
        component={MarketScreen} 
        options={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="Buying" 
        component={BuyingScreen} 
        options={{ 
            title: 'Buying', 
            headerStyle: { backgroundColor: '#79D7BE' }, 
            headerTintColor: 'black',
            headerTitleAlign: 'center' 
        }} 
        />
        <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}  
        options={{ 
            title: 'Checkout', 
            headerStyle: { backgroundColor: '#79D7BE' }, 
            headerTintColor: 'black', 
            headerTitleAlign: 'center' 
        }} 
        />
    </Stack.Navigator>
    );

    const AppNavigator = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
            {/* Tab Navigator */}
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
            component={LibraryScreen} 
            options={{ 
                headerShown: true, 
                title: 'Library',  
                headerStyle: { backgroundColor: '#79D7BE' }, 
                headerTintColor: 'black', 
                headerTitleAlign: 'center', 
            }} 
            />
            <Tab.Screen 
            name="Camera"  
            component={CameraScreen} 
            options={{ 
                title: 'Camera',  
                headerStyle: { backgroundColor: '#79D7BE' }, 
                headerTintColor: 'black', 
                headerTitleAlign: 'center', 
            }} 
            />
            <Tab.Screen 
            name="Account" 
            component={AccountScreen} 
            options={{ headerShown: false }} 
            />

            <Stack.Screen 
            name="ArtworkDetail" 
            component={ArtworkDetailScreen} 
            options={{ 
                headerShown: true, 
                title: 'Artwork Details', 
                headerStyle: { backgroundColor: '#79D7BE' }, 
                headerTintColor: 'black', 
                headerTitleAlign: 'center', 
            }} 
            />

            <Stack.Screen 
            name="Publish_buy" 
            component={Publish_buy} 
            options={{ 
                headerShown: true, 
                title: 'Buying', 
                headerStyle: { backgroundColor: '#79D7BE' }, 
                headerTintColor: 'black', 
                headerTitleAlign: 'center', 
            }} 
            />

        </Stack.Navigator>
        </NavigationContainer>
    );
    };

export default AppNavigator;
