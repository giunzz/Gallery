import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/ExploreScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Explore" component={ExploreScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;