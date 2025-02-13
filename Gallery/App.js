import React from 'react';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import MainNavigator from './navigation/MainNav';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={'#79D7BE'} />
      <GestureHandlerRootView>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </View>
  );
};

export default App;
