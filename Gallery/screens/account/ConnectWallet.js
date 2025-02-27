import {
  View,
  SafeAreaView,
  TextInput,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';

import Header from '../../components/AccountFlow/Header';
import {PROJECT_ID} from '@env';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import Metamask from '../../assets/account/Metamask.svg';

// Patch BackHandler.removeEventListener if it's not defined
if (!BackHandler.removeEventListener) {
  BackHandler.removeEventListener = () => {};
}

const projectId = PROJECT_ID;

const providerMetadata = {
  name: 'Gallery',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const ConnectWallet = ({navigation}) => {
  const {open, isConnected, address, provider} = useWalletConnectModal();
  const [text, setText] = useState('');

  const handleTextChange = inputText => {
    setText(inputText);
  };

  const signText = async text => {
    try {
      if (text === '') {
        throw new Error('Text is empty');
      }
      if (!isConnected) {
        throw new Error('Wallet is not connected');
      }
      const message = text;
      const signature = await provider.request({
        method: 'personal_sign',
        params: [message, address],
      });
      return signature;
    } catch (error) {
      console.error('Signing failed:', error);
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
    <SafeAreaView style={{flex: 1}}>
      <Header goBack={true} title="Connect Wallet" navigation={navigation} />
      <View style={styles.container}>
        <Image
          source={require('../../assets/home/ava.png')}
          style={styles.profileImage}
        />
        <View style={styles.walletContainer}>
          <Text
            style={{
              color: '#F6F4F0',
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 24,
              marginTop: 16,
            }}>
            Create your art, create your story
          </Text>
          <Text
            style={{
              color: '#F6F4F0',
              fontSize: 12,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            By connecting your wallet, you agree to our Terms of Service and our
            Privacy Policy.
          </Text>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={() => connectWallet()}>
            {isConnected ? (
              <View style={{flexDirection: 'row', gap: 20}}>
                <Metamask width={24} height={24} />
                <Text style={{fontSize: 18, color: '#23262F', fontWeight: 600}}>
                  Metamask
                </Text>
              </View>
            ) : (
              <Text style={{fontSize: 18, color: '#23262F', fontWeight: 600}}>
                Connect Wallet
              </Text>
            )}
            <FontAwesomeIcon icon={faChevronRight} size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFF',
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 24,
            }}>
            Let sign your text here:
          </Text>
          <View
            style={{
              height: 60,
              backgroundColor: '#FFF',
              paddingHorizontal: 16,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              borderRadius: 16,
            }}>
            <TextInput
              style={{
                color: '#000',
                fontSize: 14,
                backgroundColor: '#FFF',
                width: '100%',
              }}
              placeholder="Enter text"
              onChangeText={handleTextChange}
              value={text}
            />
          </View>
          <TouchableOpacity
            style={styles.signTextButton}
            onPress={() => {
              signText(text).then(console.log);
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 16,
                fontWeight: 700,
              }}>
              Sign Text
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <WalletConnectModal
        explorerRecommendedWalletIds={[
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        ]}
        explorerExcludedWalletIds={'ALL'}
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    position: 'absolute',
    top: 60,
    height: '80',
    width: '80',
    zIndex: 1,
  },
  walletContainer: {
    borderRadius: 32,
    backgroundColor: '#4DA1A9',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 32,
    height: '450',
  },
  connectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F6F4F0',
    padding: 16,
    borderRadius: 16,
    width: '100%',
  },
  signTextButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 100,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
});

export default ConnectWallet;
