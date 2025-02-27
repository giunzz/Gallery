import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../../components/AccountFlow/Header';

const collectionData = [
  {id: '1', title: 'Looking', image: require('../../assets/home/art.png')},
  {id: '2', title: 'Dreamy', image: require('../../assets/home/art.png')},
  {id: '3', title: 'Surreal', image: require('../../assets/home/art.png')},
  {id: '4', title: 'Surreal', image: require('../../assets/home/art.png')},
  {id: '5', title: 'Surreal', image: require('../../assets/home/art.png')},
  {id: '6', title: 'Surreal', image: require('../../assets/home/art.png')},
  {id: '7', title: 'Surreal', image: require('../../assets/home/art.png')},
  {id: '8', title: 'Surreal', image: require('../../assets/home/art.png')},
];

const LibraryMain = ({navigation}) => {
  if (collectionData.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Header title="Library" navigation={navigation} />
        <Text style={styles.emptyText}>No image found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Library" navigation={navigation} />
      <FlatList
        data={collectionData}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.artCard}
            onPress={() =>
              navigation.navigate('Drawing', {
                image: item.image,
                title: item.title,
              })
            }>
            <Image source={item.image} style={styles.artImage} />
            <Text style={styles.artTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.artGrid} // Optional: add spacing for the grid
        showsVerticalScrollIndicator={false} // Hide scroll indicator
      />
    </SafeAreaView>
  );
};

export default LibraryMain;

const styles = StyleSheet.create({
  artGrid: {
    padding: 10,
  },
  artCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  artImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  artTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
