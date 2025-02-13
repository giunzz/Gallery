import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountMain from '../screens/account/AccountMain';

const AccountNav = () => {
  const AccountStack = createStackNavigator();
  return (
    <AccountStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <AccountStack.Screen name="Account" component={AccountMain} />
    </AccountStack.Navigator>
  );
};

export default AccountNav;
