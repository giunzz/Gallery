import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'; 

const UploadPicture = () => {
    const [imageUri, setImageUri] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Permission Denied',
                'Sorry, we need camera roll permission to upload images.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, 
            allowsEditing: true,
            aspect: [4, 3], 
            quality: 1, 
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri); 
        } else {
            Alert.alert('Image selection canceled');
        }
    };

    const uploadImage = async () => {
        if (!imageUri) {
            Alert.alert('No image selected', 'Please select an image before uploading.');
            return;
        }
    
        const formData = new FormData(); 
        formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg', 
            name: 'photo.jpg', 
        });
    
        try {
            const response = await axios.post('http://54.169.208.148/picture/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                    'Authorization': 'Bearer YOUR_API_TOKEN', 
                },
            });
            console.log('Image uploaded successfully:', response.data);
            Alert.alert('Success', 'Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Picture</Text>
            <View style={styles.imageContainer}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <Text style={styles.placeholderText}>No image selected</Text>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, !imageUri && styles.disabledButton]} 
                onPress={uploadImage} 
                disabled={!imageUri}
            >
                <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Upload Your Pictures Easily</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9', // Light background color
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Dark text color
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
        backgroundColor: '#eaeaea', // Light gray background for image container
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderText: {
        color: '#777',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4DA1A9', 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff', 
        fontSize: 18,
    },
    disabledButton: {
        backgroundColor: '#ccc', 
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#79D7BE", 
        paddingVertical: 10,
        alignItems: "center",
    },
    footerText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default UploadPicture;
// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     Image,
//     TouchableOpacity,
//     StyleSheet,
//     SafeAreaView,
//     FlatList,
//     ScrollView,
//     TextInput,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
// import config from '../config.js';

// const projectId = config.PROJECT_ID;

// const providerMetadata = {
//     name: 'Gallery',
//     description: 'YOUR_PROJECT_DESCRIPTION',  // Replace with your actual description
//     url: 'https://your-project-website.com/', // Replace with your website
//     icons: ['https://your-project-logo.com/'], // Replace with your logo URL
//     redirect: {
//         native: 'YOUR_APP_SCHEME://', // Replace with your app's scheme
//         universal: 'YOUR_APP_UNIVERSAL_LINK.com', // Replace with your app's universal link
//     },
// };

// const collectionData = [
//     { id: "1", title: "Looking", image: require("../assets/home/art.png") },
//     { id: "2", title: "Dreamy", image: require("../assets/home/art.png") },
//     { id: "3", title: "Surreal", image: require("../assets/home/art.png") },
// ];

// const AccountScreen = ({ navigation }) => {
//     const { open, isConnected, address, provider } = useWalletConnectModal();
//     const [text, setText] = useState('');
//     const [selectedTab, setSelectedTab] = useState("Collection");
//     const [message, setMessage] = useState('');
//     const [token, setToken] = useState('');
//     const [userSignature, setUserSignature] = useState('');

//     const handleTextChange = (inputText) => {
//         setText(inputText);
//     };

//     const handleConnectWallet = async () => {
//         try {
//             if (!isConnected) {
//                 await open();
//                 return;
//             }

//             const userAddress = address;

//             const serverMessage = await getMessageFromServer(userAddress);
//             setMessage(serverMessage);

//             const signature = await signMessage(serverMessage, provider, userAddress);

//             const authToken = await getAuthorizationToken(userAddress, serverMessage, signature);
//             setToken(authToken);

//             console.log("Authorization Token:", authToken);
//             Alert.alert("Success", "Wallet connected and token received!");
//         } catch (error) {
//             console.error("Error in wallet connection flow:", error);
//             Alert.alert("Error", "Failed to connect wallet or obtain token.");
//         }
//     };

//     const signText = async (text) => {
//         try {
//             if (text === "") {
//                 throw new Error("Text is empty");
//             }
//             if (!isConnected) {
//                 throw new Error("Wallet is not connected");
//             }

//             const signature = await provider.request({
//                 method: "personal_sign",
//                 params: [text, address],
//             });

//             setUserSignature(signature);
//             console.log(signature);
//             return signature;
//         } catch (error) {
//             console.error("Signing failed:", error);
//             return null;
//         }
//     };

//     const connectWallet = async () => {
//         try {
//             if (isConnected) {
//                 await provider.disconnect();
//                 console.log("Wallet disconnected");
//             } else {
//                 await open();
//                 console.log("Wallet connected");
//             }
//         } catch (error) {
//             console.error("Connection error:", error);
//             Alert.alert("Error", "Failed to connect to the wallet. Please try again.");
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Ionicons name="chevron-back" size={24} color="black" />
//                 </TouchableOpacity>
//                 <View style={styles.headerIcons}>
//                     <Ionicons name="notifications-outline" size={24} color="black" />
//                     <Ionicons name="cart-outline" size={24} color="black" />
//                 </View>
//             </View>

//             <ScrollView contentContainerStyle={styles.scrollView}>
//                 <View style={styles.profileCard}>
//                     <Image source={require("../assets/home/ava.png")} style={styles.profileImage} />
//                     <Text style={styles.username}>@Jane</Text>
//                     <Ionicons name="shield-checkmark" size={16} color="gold" />

//                     <View style={styles.buttonGroup}>
//                         <TouchableOpacity style={styles.smallButton}>
//                             <Text style={styles.buttonText}>Edit account</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.smallButton}>
//                             <Text style={styles.buttonText}>Verify artist</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.statsContainer}>
//                         <View style={styles.stat}>
//                             <Text style={styles.statNumber}>2k</Text>
//                             <Text style={styles.statLabel}>Follower</Text>
//                         </View>
//                         <View style={styles.stat}>
//                             <Text style={styles.statNumber}>10</Text>
//                             <Text style={styles.statLabel}>Picture</Text>
//                         </View>
//                         <View style={styles.stat}>
//                             <Text style={styles.statNumber}>89</Text>
//                             <Text style={styles.statLabel}>Comments</Text>
//                         </View>
//                     </View>

//                     <TouchableOpacity style={styles.connectButton} onPress={connectWallet}>
//                         <Text style={styles.connectButtonText}>
//                             {isConnected ? `Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Connect Wallet"}
//                         </Text>
//                     </TouchableOpacity>

//                     {message && <Text style={styles.messageText}>{message}</Text>}
//                     {token && <Text style={styles.tokenText}>Authorization Token: {token.substring(0, 15)}...</Text>}
//                     {userSignature && <Text style={styles.tokenText}>User Signature: {userSignature.substring(0, 15)}...</Text>}

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter text to sign"
//                         onChangeText={handleTextChange}
//                         value={text}
//                     />

//                     <TouchableOpacity style={styles.signButton} onPress={() => signText(text)}>
//                         <Text style={styles.signButtonText}>Sign Text</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.tabs}>
//                     <TouchableOpacity
//                         style={[styles.tab, selectedTab === "Collection" && styles.activeTab]}
//                         onPress={() => setSelectedTab("Collection")}
//                     >
//                         <Text style={styles.tabText}>Collection</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={[styles.tab, selectedTab === "Activity" && styles.activeTab]}
//                         onPress={() => setSelectedTab("Activity")}
//                     >
//                         <Text style={styles.tabText}>Activity</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {selectedTab === "Collection" && (
//                     <FlatList
//                         data={collectionData}
//                         renderItem={({ item }) => (
//                             <View style={styles.artCard}>
//                                 <Image source={item.image} style={styles.artImage} />
//                                 <Text style={styles.artTitle}>{item.title}</Text>
//                                 <View style={styles.artActions}>
//                                     <TouchableOpacity style={styles.viewButton}>
//                                         <Text style={styles.viewText}>Publish</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={styles.musicButton}>
//                                         <Text style={styles.musicText}>Listen music</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         )}
//                         keyExtractor={(item) => item.id}
//                         numColumns={2}
//                         contentContainerStyle={styles.artGrid}
//                     />
//                 )}
//             </ScrollView>

//             <WalletConnectModal
//                 explorerRecommendedWalletIds={['c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96']}
//                 explorerExcludedWalletIds={'ALL'}
//                 projectId={projectId}
//                 providerMetadata={providerMetadata}
//             />
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#F8F8F8" },
//     header: { flexDirection: "row", justifyContent: "space-between", padding: 20, backgroundColor: "#79D7BE" },
//     headerIcons: { flexDirection: "row", top: 8 },
//     scrollView: { paddingBottom: 80 },
//     profileCard: { alignItems: "center", padding: 16 },
//     profileImage: { width: 80, height: 80, borderRadius: 40 },
//     username: { fontSize: 18, fontWeight: "bold", marginVertical: 8 },
//     buttonGroup: { flexDirection: "row", marginTop: 8 },
//     smallButton: { backgroundColor: "#1B5E20", padding: 6, margin: 5, borderRadius: 8 },
//     buttonText: { color: "white", fontSize: 12 },
//     statsContainer: { flexDirection: "row", justifyContent: "space-around", width: "80%", marginTop: 16 },
//     stat: { alignItems: "center" },
//     statNumber: { fontSize: 16, fontWeight: "bold" },
//     statLabel: { fontSize: 12, color: "gray" },
//     tabs: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
//     tab: { padding: 10, marginHorizontal: 20 },
//     activeTab: { borderBottomWidth: 2, borderColor: "#79D7BE" },
//     tabText: { fontSize: 16, fontWeight: "bold" },
//     artGrid: { padding: 10 },
//     artCard: { flex: 1, margin: 10 },
//     artImage: { width: "100%", height: 100, borderRadius: 10 },
//     artTitle: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
//     artActions: { flexDirection: "row", marginTop: 5 },
//     viewButton: { backgroundColor: "#79D7BE", padding: 4, borderRadius: 5, marginRight: 5 },
//     musicButton: { backgroundColor: "#FFD700", padding: 4, borderRadius: 5 },
//     input: { height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, width: '80%', paddingHorizontal: 10 },
//     signButton: { backgroundColor: "#79D7BE", padding: 10, borderRadius: 5, marginTop: 10 },
//     signButtonText: { color: "white", textAlign: "center" },
//     connectButton: { backgroundColor: "#79D7BE", padding: 10, borderRadius: 5, marginTop: 20 },
//     connectButtonText: { color: "white", textAlign: "center" },
//     messageText: { marginTop: 10, color: "black" },
//     tokenText: { marginTop: 10, color: "black" },
// });

// export default AccountScreen;