import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import AccountScreen from '../screens/AccountScreen';
import MarketScreen from '../screens/MarketScreen';
import BuyingScreen from '../screens/BuyingScreen';

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
        headerTitleAlign: 'center', 
    }} 
/>

    </Stack.Navigator>
);

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Explore" component={ExploreScreen} />
                <Tab.Screen name="Market" component={MarketStack} options={{ headerShown: false }} />
                <Tab.Screen name="Account" component={AccountScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;