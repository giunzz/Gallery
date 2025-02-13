import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ScanMain from '../screens/scan/ScanMain';

const ScanNav = () => {
  const ScanStack = createStackNavigator();
  return (
    <ScanStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <ScanStack.Screen name="Scan" component={ScanMain} />
    </ScanStack.Navigator>
  );
};

export default ScanNav;
