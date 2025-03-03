import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({content, onPress, width}) => {
  return (
    <TouchableOpacity style={[styles.button, {width: width}]} onPress={onPress}>
      <Text style={styles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#79D7BE',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
  },
});

export default Button;
