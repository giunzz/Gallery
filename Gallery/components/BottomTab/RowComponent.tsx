/* eslint-disable react-native/no-inline-styles */
import {View, StyleProp, ViewStyle} from 'react-native';
import React from 'react';

interface Props {
  children: any;
  styles?: StyleProp<ViewStyle>;
}

const RowComponent = (props: Props) => {
  const {children, styles} = props;

  return (
    <View
      style={[
        styles,
        {
          flexDirection: 'column',
          padding: 4,
        },
      ]}>
      {children}
    </View>
  );
};

export default RowComponent;
