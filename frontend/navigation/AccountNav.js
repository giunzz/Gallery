import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ProfileScreen from "../screens/account/AccountScreen";
import ConnectWallet from "../screens/account/ConnectWallet";
import UserAgreement from "../screens/account/UserAgreement";
import VerifyArtist from "../screens/account/EditAccount";

const AccountNav = () => {
  const AccountStack = createStackNavigator();
  return (
    <AccountStack.Navigator
      initialRouteName="Account"
      screenOptions={{ header: () => null, headerShown: false }}>
      <AccountStack.Screen name="Account" component={ProfileScreen} />
      <AccountStack.Screen name="VerifyArtist" component={VerifyArtist} />
      <AccountStack.Screen name="UserAgreement" component={UserAgreement} />
      <AccountStack.Screen name="ConnectWallet" component={ConnectWallet} />
    </AccountStack.Navigator>
  );
};

export default AccountNav;
