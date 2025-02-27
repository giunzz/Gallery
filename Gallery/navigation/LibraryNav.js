import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LibraryMain from '../screens/library/LibraryMain';
import Drawing from '../screens/library/Drawing';

const LibraryNav = () => {
  const LibraryStack = createStackNavigator();
  return (
    <LibraryStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <LibraryStack.Screen name="Library" component={LibraryMain} />
      <LibraryStack.Screen name="Drawing" component={Drawing} />
    </LibraryStack.Navigator>
  );
};

export default LibraryNav;
