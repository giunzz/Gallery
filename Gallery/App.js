import React from 'react';
import {Text, StatusBar, View} from 'react-native';
import Button from './components/Button/Button';
import InputField from './components/InputField/InputField';

const App = () => {
  return (
    <View>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#79D7BE'} />
      <Text>Hello, world!</Text>
      <Button
        content={'Press me!'}
        onPress={() => console.log('Button pressed!')}
        width="80%"
      />
      <InputField
        title={'Name'}
        placeholder={'Enter your name'}
        secure={true}
        keyboardType={'password'}
      />
    </View>
  );
};

export default App;
