import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, children }) => {
    return (
        <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default Card;