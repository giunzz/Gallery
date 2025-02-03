import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

const AccountScreen = () => {
    return (
        <View style={styles.container}>
        <Header />
        <Button title="Upgrade" onPress={() => alert('Upgrade pressed!')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AccountScreen;
