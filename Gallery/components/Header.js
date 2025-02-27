import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      {/* <View style={styles.line} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#79D7BE',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: 'white',
    marginTop: 5,
  },
});

export default Header;
