import { ethers } from 'ethers';

export const signMessage = async (message) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    return signature;
};
