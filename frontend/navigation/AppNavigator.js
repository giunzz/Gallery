import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import AccountScreen from '../screens/AccountScreen';
import MarketScreen from '../screens/MarketScreen';
import BuyingScreen from '../screens/BuyingScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import LibraryScreen from '../screens/Library';
import CameraScreen from '../screens/CameraScreen';
import ArtworkDetailScreen from '../screens/ArtworkDetailScreen';
import Publish_buy from '../screens/PublishScreen_buy';
import GenerateArtScreen from '../screens/GenerateArtScreen';
import CanvasSizeScreen from '../screens/CanvasSizeScreen'; 
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// **Market Stack**
const MarketStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Market" component={MarketScreen} options={{ headerShown: false }} />
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

// **Library Stack**
const LibraryStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Library" 
            component={LibraryScreen} 
            options={{ 
                title: 'Library',  
                headerStyle: { backgroundColor: '#79D7BE' }, 
                headerTintColor: 'black', 
                headerTitleAlign: 'center',
            }} 
        />
        <Stack.Screen 
            name="ArtworkDetail" 
            component={ArtworkDetailScreen} 
            options={{ 
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
                title: 'Buying', 
                headerStyle: { backgroundColor: '#79D7BE' }, 
                headerTintColor: 'black', 
                headerTitleAlign: 'center', 
            }} 
        />
    </Stack.Navigator>
);

// **Bottom Tab Navigator**
const BottomTabs = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Market" component={MarketStack} />
        <Tab.Screen name="Library" component={LibraryStack} />
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
        <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
);

// **Main App Navigator**
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Main Tabs */}
                <Stack.Screen name="MainTabs" component={BottomTabs} />

                {/* Screens outside of Tabs */}
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
