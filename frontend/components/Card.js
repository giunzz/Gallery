import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Card = ({ title, children, imageSource, style, visual, visualsmal }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        {imageSource && (
          <View style={styles.iconContainer}>
            <Image source={imageSource} style={styles.icon} />
          </View>
        )}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardContent}>{children}</Text>
      {visual && <Image source={visual} style={styles.visualImage} />}
      {visualsmal && <Image source={visualsmal} style={styles.visualsmalImg} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
    backgroundColor: '#6200EE',
    shadowColor: '#000',
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
    marginBottom: 80,  
  },
  iconContainer: {
    width: 20,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    bottom: 8,
    position: 'relative',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    position: 'absolute',
    shadowColor: '#000', // Shadow color for the icon
  },
  visualImage: {
    width: 140,
    height: 140, 
    borderRadius: 100,
    marginTop: 10, 
    bottom: 130,
    left: 180,
  },
  visualsmalImg: {
    width: 80,
    height: 75,
    borderRadius: 100,
    bottom: 100,
    left: 60,
  }
});

export default Card;
