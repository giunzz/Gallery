import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

import { TextInput } from 'react-native';
import {
	WalletConnectModal,
	useWalletConnectModal,
} from '@walletconnect/modal-react-native';

import config from '../config.js'
const projectId = config.PROJECT_ID;

const providerMetadata = {
	name: 'YOUR_PROJECT_NAME',
	description: 'YOUR_PROJECT_DESCRIPTION',
	url: 'https://your-project-website.com/',
	icons: ['https://your-project-logo.com/'],
	redirect: {
		native: 'YOUR_APP_SCHEME://',
		universal: 'YOUR_APP_UNIVERSAL_LINK.com',
	},
};

const AccountScreen = () => {
    const { open, isConnected, address, provider } = useWalletConnectModal();

	const [text, setText] = React.useState('');

	const handleTextChange = (inputText) => {
		setText(inputText);
		// console.log(text);
	};

	const signText = async (text) => {
		try {
			if (text == "") {
				throw new Error("Text is empty");
			}
			if (!isConnected) {
				throw new Error("Wallet is not connected");
			}
		
			const message = text; //encodeUtf8(text);
			// provider.cleanupPendingPairings();
			const signature = await provider.request({
				method: "personal_sign",
				params: [message, address],
			});
		
			return signature;
		} catch (error) {
			console.error("Signing failed:", error);
			return null;
		}
	};

	const connectWallet = async () => {
		if (isConnected) {
			return provider?.disconnect();
		}
		return open();
	};
	

    return (
        <View style={styles.container}>
        <Header />
        <Button title={isConnected ? address : "connect wallet"} onPress={() => connectWallet()} />
		<TextInput
			style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, width: '80%' }}
			placeholder="Enter text"
			onChangeText={handleTextChange}			
		/>
		<Button title="Sign Text" onPress={() => {
			signText(text).then(console.log);
		}} />
        <WalletConnectModal
				explorerRecommendedWalletIds={[
					'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
				]}
				explorerExcludedWalletIds={'ALL'}
				projectId={projectId}
				providerMetadata={providerMetadata}
			/>
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
