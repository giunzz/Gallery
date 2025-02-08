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
    justifyContent: "space-between",
    backgroundColor: "#6200EE", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
    color: '#FFFFFF',
    flexShrink: 1, 
  },
  cardContent: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  icon: {
    width: 30,
    height: 25,
    resizeMode: "contain",
  },
});

export default Card;
