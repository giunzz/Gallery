import {View, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import React from 'react';

import Button from '../../components/Button/button';

const VerifyArtist = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
        
        <View style={styles.container}>
            <TextInput
            style={styles.description}
            placeholder="A short description of your style and background"
            />
            <TextInput style={styles.input} placeholder="Owner Name" />
            <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Phone Number"
            />
            <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email Address"
            />
            <TextInput style={styles.input} placeholder="Passport" />
            <TextInput style={styles.input} placeholder="License type" />
            <TextInput
            style={styles.description}
            placeholder="A short description of your style and background"
            />
            <Button
            content={'Done'}
            width={'80%'}
            onPress={() => navigation.navigate('Account')}
            />
        </View>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        width: '80%',
        padding: 10,
        margin: 10,
        fontSize: 14,
    },
    description: {
        top: 5,
        height: 125,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        width: '80%',
        padding: 10,
        margin: 10,
        fontSize: 14,
        numberOfLines: 5,
    },
    });

    export default VerifyArtist;