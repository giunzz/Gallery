import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SearchOwnership from "../screens/scan/CameraScreen";

const ScanNav = () => {
  const ScanStack = createStackNavigator();
  return (
    <ScanStack.Navigator
      initialRouteName="CameraScreen"
      screenOptions={{ header: () => null, headerShown: false }}>
      <ScanStack.Screen name="CameraScreen" component={SearchOwnership} />
    </ScanStack.Navigator>
  );
};

export default ScanNav;
