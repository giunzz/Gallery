import React from 'react';

import { Modal, View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import ColorPicker, {
  Panel1,
  Swatches,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import {useTheme} from "../../theme";
const ColorPicker = ({onSelectColor, show, onClose, selectedColor}) => {
  const {theme: {colors}} = useTheme();
  return (
    <Modal visible={show} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ColorPicker value={selectedColor} onComplete={onSelectColor}>
            <Panel1 style={styles.spacer} />
            <HueSlider style={styles.spacer} />
            <OpacitySlider style={styles.spacer} />
            <Swatches style={styles.spacer} />
          </ColorPicker>
          <TouchableHighlight
            style={styles.buttonContainer}
            underlayColor={colors.underlayColor}
            onPress={onClose}>
            <Text style={[{ color: colors.textColors.secondaryText }, styles.button]}>CLOSE</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

export default ColorPicker;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: '5%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '5%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  spacer: {
    marginVertical: '3%',
  },
  buttonContainer: {
    marginTop: '5%',
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
