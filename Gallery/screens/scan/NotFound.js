import {SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../components/AccountFlow/Header';

const NotFound = ({route, navigation}) => {
  const {imageUri} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Header
        goBack={true}
        title={'Artist'}
        navigation={navigation}
        icon={false}
      />
      <View style={styles.contentContainer}>
        <Image source={{uri: imageUri}} style={{width: 300, height: 300}} />
        <Text
          style={{
            color: '#116438',
            fontSize: 36,
            fontWeight: 400,
            textAlign: 'center',
          }}>
          No Results Found
        </Text>
        <Text style={{color: '#B0B0B0', fontSize: 16, textAlign: 'center'}}>
          We couldn’t find what you searched for. Try searching again.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default NotFound;
