import React from 'react';
import { Button } from 'react-native';
import { ethers } from 'ethers';

const MetaMaskButton = ({ onConnect }) => {
    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                onConnect(accounts[0]);
            } catch (error) {
                console.error("User rejected the request");
            }
        } else {
            alert("MetaMask is not installed");
        }
    };

    return <Button title="Connect to MetaMask" onPress={connectMetaMask} />;
};

export default MetaMaskButton;