import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LibraryMain from '../screens/library/LibraryMain';
import Drawing from '../screens/library/Drawing';
import ArtworkDetail from '../screens/library/ArtworkDetail';
import Publish from '../screens/library/Publish';

const LibraryNav = () => {
  const LibraryStack = createStackNavigator();
  return (
    <LibraryStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <LibraryStack.Screen name="Library" component={LibraryMain} />
      <LibraryStack.Screen name="ArtworkDetail" component={ArtworkDetail} />
      <LibraryStack.Screen name="Drawing" component={Drawing} />
      <LibraryStack.Screen name="Publish" component={Publish} />
    </LibraryStack.Navigator>
  );
};

export default LibraryNav;
