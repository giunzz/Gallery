import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountMain from '../screens/account/AccountMain';
import VerifyArtist from '../screens/account/EditAccount';
import UserAgreement from '../screens/account/UserAgreement';
import ConnectWallet from '../screens/account/ConnectWallet';

const AccountNav = () => {
  const AccountStack = createStackNavigator();
  return (
    <AccountStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <AccountStack.Screen name="Account" component={AccountMain} />
      <AccountStack.Screen name="VerifyArtist" component={VerifyArtist} />
      <AccountStack.Screen name="UserAgreement" component={UserAgreement} />
      <AccountStack.Screen name="ConnectWallet" component={ConnectWallet} />
    </AccountStack.Navigator>
  );
};

export default AccountNav;
