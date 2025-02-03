import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>New art</Text>
        <Text>Let's see what can I do for you?</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Generate Platter</Text>
        <Text>Explore new possibilities!</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Exploring Market</Text>
        <Text>Discover amazing artworks!</Text>
      </View>
    </ScrollView>
  );
}

function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text>Hi, David!</Text>
      <Button title="Upgrade" onPress={() => alert('Upgrade pressed!')} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
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
  scrollContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});