import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const InputField = ({
  title,
  icon,
  placeholder,
  keyboardType,
  width,
  secure,
}) => {
  return (
    <View style={[styles.container, {width: width}]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View>
        {icon && (
          <View style={{position: 'absolute', top: 10, left: 14}}>{icon}</View>
        )}
        <TextInput
          style={[styles.input, {paddingLeft: icon ? 42 : 14}]}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secure}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    color: '#272A31',
    fontWeight: 500,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C9CDD2',
    borderRadius: 10,
    paddingRight: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: '#61646B',
  },
});

export default InputField;
