import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ExploreMain from '../screens/explore/ExploreMain';

const ExploreNav = () => {
  const ExploreStack = createStackNavigator();
  return (
    <ExploreStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <ExploreStack.Screen name="Explore" component={ExploreMain} />
    </ExploreStack.Navigator>
  );
};

export default ExploreNav;
