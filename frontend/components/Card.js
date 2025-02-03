import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Card = ({ title, children, imageSource, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        {imageSource && <Image source={imageSource} style={styles.icon} />}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardContent}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
    color: '#FFFFFF',
  },
  cardContent: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Card;
