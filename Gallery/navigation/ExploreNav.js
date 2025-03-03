import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ExploreMain from '../screens/explore/ExploreMain';
import SearchResultsScreen from '../screens/explore/SearchResultsScreen';

const ExploreNav = () => {
  const ExploreStack = createStackNavigator();
  return (
    <ExploreStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <ExploreStack.Screen name="Explore" component={ExploreMain} />
      <ExploreStack.Screen
        name="SearchResultsScreen"
        component={SearchResultsScreen}
      />
    </ExploreStack.Navigator>
  );
};

export default ExploreNav;
