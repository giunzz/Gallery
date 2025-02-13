import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LibraryMain from '../screens/library/LibraryMain';

const LibraryNav = () => {
  const LibraryStack = createStackNavigator();
  return (
    <LibraryStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <LibraryStack.Screen name="Library" component={LibraryMain} />
    </LibraryStack.Navigator>
  );
};

export default LibraryNav;
