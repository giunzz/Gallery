import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import AccountScreen from '../screens/AccountScreen';
import MarketScreen from '../screens/MarketScreen';
import BuyingScreen from '../screens/BuyingScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MarketStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Market" component={MarketScreen} options={{ headerShown: false }} />
        <Stack.Screen 
            name="Buying" 
            component={BuyingScreen} 
            options={{ 
                headerShown: true, 
                title: 'Buying', 
                headerStyle: { backgroundColor: '#79D7BE' }, 
                headerTintColor: 'black', 
                headerTitleAlign: 'center', }} 
        />
        <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen}  
            options={{ 
                headerShown: true, 
                title: 'Checkout', 
                headerStyle: { backgroundColor: '#79D7BE' }, 
                headerTintColor: 'black', 
                headerTitleAlign: 'center', }} 
        />
    </Stack.Navigator>
);

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Market" component={MarketStack} options={{ headerShown: false }} />
                <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;