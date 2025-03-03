import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MarketMain from '../screens/market/MarketMain';

const MarketNav = () => {
  const MarketStack = createStackNavigator();
  return (
    <MarketStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <MarketStack.Screen name="Market" component={MarketMain} />
    </MarketStack.Navigator>
  );
};

export default MarketNav;
