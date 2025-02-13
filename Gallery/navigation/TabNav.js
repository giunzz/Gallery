import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

//import sub navigators
import MarketNav from './MarketNav';
import LibraryNav from './LibraryNav';
import ExploreNav from './ExploreNav';
import AccountNav from './AccountNav';
import ScanNav from './ScanNav';

//import svg icons
import Account from '../assets/bottomTabSvg/Account.svg';
import Explore from '../assets/bottomTabSvg/Explore.svg';
import Lib from '../assets/bottomTabSvg/Lib.svg';
import Market from '../assets/bottomTabSvg/Market.svg';
import Scan from '../assets/bottomTabSvg/Scan.svg';
import UnselectedAccount from '../assets/bottomTabSvg/UnselectedAccount.svg';
import UnselectedExplore from '../assets/bottomTabSvg/UnselectedExplore.svg';
import UnselectedMarket from '../assets/bottomTabSvg/UnselectedMarket.svg';
import UnselectedLib from '../assets/bottomTabSvg/UnselectedLib.svg';
import UnselectedScan from '../assets/bottomTabSvg/UnselectedScan.svg';

import RowComponent from '../components/BottomTab/RowComponent';

const getTabBarVisibility = route => {
  const allowedRoutes = ['Explore', 'Scan', 'Market', 'Account', 'Library'];
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Explore';
  if (allowedRoutes.includes(routeName)) {
    return {
      display: 'flex', // Shows the tab bar
      height: 50, // Sets the height of the tab bar
      justifyContent: 'center', // Centers the tabs
      alignItems: 'center',
      borderTopLeftRadius: 30, // Rounds the top corners
      borderTopRightRadius: 30,
    };
  }
  return {display: 'none'};
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarIcon: ({focused}) => {
          let IconComponent;
          let label;

          if (route.name === 'ExploreNav') {
            IconComponent = focused ? Explore : UnselectedExplore;
            label = 'Explore';
          } else if (route.name === 'ScanNav') {
            IconComponent = focused ? Scan : UnselectedScan;
            label = 'Scan';
          } else if (route.name === 'MarketNav') {
            IconComponent = focused ? Market : UnselectedMarket;
            label = 'Market';
          } else if (route.name === 'LibraryNav') {
            IconComponent = focused ? Lib : UnselectedLib;
            label = 'Library';
          } else if (route.name === 'AccountNav') {
            IconComponent = focused ? Account : UnselectedAccount;
            label = 'Account';
          }

          const labelWidth = label ? label.length * 8 : 0;

          return (
            <View style={[style.tabContainer, {width: labelWidth + 24}]}>
              <RowComponent
                styles={{
                  alignItems: 'center',
                }}>
                <IconComponent width={22} height={22} />
                {focused && (
                  <Text
                    style={[
                      style.tabLabel,
                      focused ? {color: '#79D7BE'} : {color: '#2E5077'},
                    ]}>
                    {label}
                  </Text>
                )}
              </RowComponent>
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="ExploreNav"
        component={ExploreNav}
        options={({route}) => ({
          headerTitle: 'Explore',
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="ScanNav"
        component={ScanNav}
        options={({route}) => ({
          headerTitle: 'Scan',
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="MarketNav"
        component={MarketNav}
        options={({route}) => ({
          headerTitle: 'Market',
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="LibraryNav"
        component={LibraryNav}
        options={({route}) => ({
          headerTitle: 'Library',
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="AccountNav"
        component={AccountNav}
        options={({route}) => ({
          headerTitle: 'Account',
          tabBarStyle: getTabBarVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  tabContainer: {
    flex: 1, // Ensures equal space for each tab
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
  },
});

export default TabNavigator;
