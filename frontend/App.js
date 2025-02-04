import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './screens/ExploreScreen';
import AccountScreen from './screens/AccountScreen';
import MarketScreen from './screens/MarketScreen';
import BuyingScreen from './screens/BuyingScreen';
import CheckoutScreen from './screens/CheckoutScreen'; // Ensure this import

import ExploreIcon from './assets/home/explore.png';
import ExploreIconOutline from './assets/home/explore.png'; // Use an actual outline version
import AccountIcon from './assets/home/person_2.png';
import AccountIconOutline from './assets/home/person_2.png'; // Use an actual outline version
import MarketIcon from './assets/home/add_business.png';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MarketStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Market" component={MarketScreen} options={{ headerShown: false }} />
    <Stack.Screen 
      name="Buying" 
      component={BuyingScreen} 
      options={{ 
        title: 'Buying', 
        headerStyle: { backgroundColor: '#79D7BE' }, 
        headerTintColor: 'black',
        headerTitleAlign: 'center' 
      }} 
    />
    <Stack.Screen 
      name="Checkout" 
      component={CheckoutScreen} 
      options={{ 
        title: 'Checkout', 
        headerStyle: { backgroundColor: '#79D7BE' }, 
        headerTintColor: 'black',
        headerTitleAlign: 'center' 
      }} 
    />
  </Stack.Navigator>
);

// Function to render tab icons
const renderIcon = (routeName, focused, size) => {
  let iconSource;

  switch (routeName) {
    case 'Explore':
      iconSource = focused ? ExploreIcon : ExploreIconOutline;
      break;
    case 'Account':
      iconSource = focused ? AccountIcon : AccountIconOutline;
      break;
    case 'Market':
      iconSource = MarketIcon; 
      break;
    default:
      iconSource = null;
  }

  return (
    <Image
      source={iconSource}
      style={{ width: size, height: size }} 
    />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => renderIcon(route.name, focused, size),
          tabBarActiveTintColor: '#00BFFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#E0FFFF',
          },
        })}
      >
        <Tab.Screen 
          name="Explore" 
          component={ExploreScreen} 
          options={{ headerShown: false }} // Hide header for Explore tab
        />
        <Tab.Screen 
          name="Market" 
          component={MarketStack} 
          options={{ headerShown: false }} // Use MarketStack
        />
        <Tab.Screen 
          name="Account" 
          component={AccountScreen} 
          options={{ headerShown: false }} // Optionally hide header for Account tab
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
