import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import Header from '../../components/AccountFlow/Header';
import ArtImage from '../../assets/home/art.png';
import {LibraryContext} from '../../components/LibraryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

const LibraryMain = ({navigation}) => {
  const {libraryItems} = useContext(LibraryContext);
  const [selectedItems, setSelectedItems] = useState([]); // Will contain at most one id
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    loadLibraryData();
  }, []);

  const loadLibraryData = async () => {
    try {
      const savedLibrary = await AsyncStorage.getItem('libraryItems');
      const parsedLibrary = savedLibrary ? JSON.parse(savedLibrary) : [];
      setArtworks([
        ...parsedLibrary,
        ...Array.from({length: 100}, (_, i) => ({
          id: `static-${i + 1}`,
          title: `Artwork  ${i + 1}`,
          type: `Type ${i + 1}`,
          image: ArtImage,
        })),
      ]);
    } catch (error) {
      console.error('Error loading library data', error);
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => {
          if (isSelected) {
            // Clear selection if the same item is pressed again.
            setSelectedItems([]);
            setSelectedArtwork(null);
          } else {
            // Select new item, unselecting any previously selected.
            setSelectedItems([item.id]);
            setSelectedArtwork(item);
          }
        }}>
        <Image
          source={
            typeof item.image === 'string' ? {uri: item.image} : item.image
          }
          style={styles.cardImage}
          fallbackSource={ArtImage}
        />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardArtist}>{item.type || 'Unknown Type'}</Text>
      </TouchableOpacity>
    );
  };

  const handleViewButtonPress = () => {
    if (selectedArtwork) {
      navigation.navigate('ArtworkDetail', {artwork: selectedArtwork});
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header goBack={true} title="Library" navigation={navigation} />
      {/* Artwork Grid */}
      <FlatList
        data={artworks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('Drawing', {artwork: null});
          }}>
          <Text style={styles.bottomText}>New art</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleViewButtonPress}>
          <Text style={styles.bottomText}>View</Text>
          <FontAwesomeIcon icon={faArrowRight} size={16} color="black" />
        </TouchableOpacity>
      </View>
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
  grid: {
    paddingBottom: 80,
  },
  card: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#79D7BE',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardArtist: {
    fontSize: 12,
    color: 'gray',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#79D7BE',
    marginHorizontal: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: 'black',
  },
});
