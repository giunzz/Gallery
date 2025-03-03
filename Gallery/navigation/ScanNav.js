import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ScanMain from '../screens/scan/ScanMain';
import NotFound from '../screens/scan/NotFound';

const ScanNav = () => {
  const ScanStack = createStackNavigator();
  return (
    <ScanStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <ScanStack.Screen name="Scan" component={ScanMain} />
      <ScanStack.Screen name="PreviewScreen" component={NotFound} />
    </ScanStack.Navigator>
  );
};

export default ScanNav;
