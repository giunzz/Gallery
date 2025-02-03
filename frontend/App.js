import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ExploreScreen from './screens/ExploreScreen';
import AccountScreen from './screens/AccountScreen';
import MarketScreen from './screens/MarketScreen';
// Import your icons
import ExploreIcon from './assets/home/explore.png';
import ExploreIconOutline from './assets/home/explore.png'; // Ensure an outline version exists
import AccountIcon from './assets/home/person_2.png';
import AccountIconOutline from './assets/home/person_2.png'; // Ensure an outline version exists
import MarketIcon from './assets/home/add_business.png';

const Tab = createBottomTabNavigator();

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
      iconSource = MarketIcon; // Assuming Market has no outline version
      break;
    default:
      iconSource = null;
  }

  return (
    <Image
      source={iconSource}
      style={{ width: size, height: size }} // Adjust size as needed
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
          component={MarketScreen} 
          options={{ headerShown: false }} // Optionally hide header for Market tab
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
