import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/AccountFlow/Header';

const ArtworkDetail = ({route, navigation}) => {
  const {artwork} = route.params;
  const [isDrawPressed, setIsDrawPressed] = useState(false);
  const [isOwnershipPressed, setIsOwnershipPressed] = useState(false);
  const [isPublishPressed, setIsPublishPressed] = useState(false);

  const handleDrawPress = () => {
    navigation.navigate('Drawing', {artwork: artwork});
  };
  // Correctly navigate to PublishScreen_buy with the artwork object
  const handlePublishPress = () => {
    navigation.navigate('Publish', {artwork: artwork});
  };

  const handleOwnerPress = () => {
    navigation.navigate('Ownership', {artwork: artwork}); // This is correct
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header goBack={true} title={artwork.title} navigation={navigation} />
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.detailsContainer}>
          <Image source={artwork.image} style={styles.artworkImage} />

          <Text style={styles.artworkType}>{artwork.type}</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.drawButton, isDrawPressed && styles.buttonPressed]}
            onPressIn={() => setIsDrawPressed(true)}
            onPressOut={() => {
              setIsDrawPressed(false);
              handleDrawPress();
            }}>
            <Text style={styles.buttonText}>Draw</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.colorButton,
              isOwnershipPressed && styles.buttonPressed,
            ]}
            onPressIn={() => setIsOwnershipPressed(true)}
            onPressOut={() => {
              setIsOwnershipPressed(false);
              handleOwnerPress(); // Call the correct navigation function
            }}>
            <Text style={styles.buttonText}>Ownership</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.publishButton,
              isPublishPressed && styles.buttonPressed,
            ]}
            onPressIn={() => setIsPublishPressed(true)}
            onPressOut={() => {
              setIsPublishPressed(false);
              handlePublishPress();
            }}>
            <Text style={styles.buttonText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  detailsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  artworkImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  artworkTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artworkType: {
    fontSize: 18,
    color: 'gray',
  },
  description: {
    marginTop: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  drawButton: {
    backgroundColor: '#777',
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorButton: {
    backgroundColor: '#E76F51',
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishButton: {
    backgroundColor: '#F4A261',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
  buttonPressed: {
    backgroundColor: '#555',
  },
});

export default ArtworkDetail;
