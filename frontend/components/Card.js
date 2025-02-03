import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Card = ({ title, children, imageSource }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {imageSource && <Image source={imageSource} style={styles.icon} />}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F7BB36',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    width: 24, // Set the width of the image
    height: 24, // Set the height of the image
    borderRadius: 12, // Optional: make it circular
  },
});

export default Card;
