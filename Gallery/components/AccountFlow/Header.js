import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faCartShopping,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

const Header = ({goBack, title, navigation, icon = true}) => {
  return (
    <View style={styles.header}>
      {goBack && (
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} size={24} color="black" />
        </TouchableOpacity>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {icon && (
        <View style={styles.headerIcons}>
          <FontAwesomeIcon icon={faBell} size={24} color="black" />
          <FontAwesomeIcon icon={faCartShopping} size={24} color="black" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  goBack: {
    position: 'absolute',
    left: 20,
  },
  headerIcons: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 5,
    right: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5077',
  },
});

export default Header;
