import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import CanvasSizeScreen from "../screens/explore/CanvasSizeScreen";
import ExploreScreen from "../screens/explore/ExploreScreen";
import GenerateArtScreen from "../screens/explore/GenerateArtScreen";
import LoadingGenArt from "../screens/explore/LoadingGenArt";
import ReportScreen from "../screens/explore/ReportScreen";
import SearchResultsScreen from "../screens/explore/SearchResultsScreen";
import ResultGenArt from "../screens/explore/ResultGenArt";

const ExploreNav = () => {
  const ExploreStack = createStackNavigator();
  return (
    <ExploreStack.Navigator
      initialRouteName="Explore"
      screenOptions={{ header: () => null, headerShown: false }}>
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
      <ExploreStack.Screen
        name="GenerateArtScreen"
        component={GenerateArtScreen}
      />
      <ExploreStack.Screen name="LoadingGenArt" component={LoadingGenArt} />
      <ExploreStack.Screen name="ResultGenArt" component={ResultGenArt} />
      <ExploreStack.Screen
        name="CanvasSizeScreen"
        component={CanvasSizeScreen}
      />
      <ExploreStack.Screen name="ReportScreen" component={ReportScreen} />
      <ExploreStack.Screen
        name="SearchResultsScreen"
        component={SearchResultsScreen}
      />
    </ExploreStack.Navigator>
  );
};

export default ExploreNav;
