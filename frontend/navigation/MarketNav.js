import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import MarketScreen from "../screens/market/MarketScreen";
import BuyingScreen from "../screens/market/BuyingScreen";
import CheckoutScreen from "../screens/market/CheckoutScreen";
import UploadPicture from "../screens/market/UploadScreen";

const MarketNav = () => {
  const MarketStack = createStackNavigator();
  return (
    <MarketStack.Navigator
      initialRouteName="MarketOverview"
      screenOptions={{ header: () => null, headerShown: false }}>
      <MarketStack.Screen name="MarketOverview" component={MarketScreen} />
      <MarketStack.Screen name="BuyingScreen" component={BuyingScreen} />
      <MarketStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <MarketStack.Screen name="UploadScreen" component={UploadPicture} />
    </MarketStack.Navigator>
  );
};

export default MarketNav;
