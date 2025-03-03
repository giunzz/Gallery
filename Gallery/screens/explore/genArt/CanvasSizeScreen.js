import React, { useState } from "react";
import {
    View, Text, TouchableOpacity, StyleSheet, SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CanvasSizeScreen = ({ navigation, route }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    const sizes = [
        { id: "1:1", label: "1:1" },
        { id: "2:3", label: "2:3" },
        { id: "3:4", label: "3:4" },
        { id: "3:2", label: "3:2" },
        { id: "4:3", label: "4:3" },
        { id: "Auto", label: "Auto" }
    ];

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    };

    const handleDone = () => {
        if (selectedSize) {
            navigation.navigate("GenerateArtScreen", { selectedSize });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <Ionicons name="settings-outline" size={24} color="black" style={styles.leftIcon} />
                <Text style={styles.headerTitle}></Text>
            </View>
=
            <View style={styles.gridContainer}>
                {sizes.map((size) => (
                    <TouchableOpacity
                        key={size.id}
                        style={[styles.sizeBox, selectedSize === size.id && styles.selectedBox]}
                        onPress={() => handleSelectSize(size.id)}
                    >
                        <Ionicons name="tablet-portrait-outline" size={40} color="white" />
                        <Text style={styles.sizeText}>{size.label}</Text>
                        {selectedSize === size.id && (
                            <Ionicons name="checkmark-circle" size={20} color="white" style={styles.checkIcon} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Done Button */}
            <TouchableOpacity 
                style={[styles.doneButton, !selectedSize && styles.disabledButton]} 
                onPress={handleDone} 
                disabled={!selectedSize}
            >
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>

            {/* Blue Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}></Text>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 20,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 50,
    },
    sizeBox: {
        flexBasis: "48%",  
        aspectRatio: 1,    
        backgroundColor: "#6DA5A3",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,  
    },
    
    leftIcon: { 
        top : 20,
        marginLeft: 300, 
    },
    selectedBox: {
        borderWidth: 5,
        borderColor: "#000",
    },
    sizeText: {
        fontSize: 16,
        color: "white",
        marginTop: 5,
    },
    checkIcon: {
        position: "absolute",
        bottom: 5,
        right: 5,
    },
    doneButton: {
        backgroundColor: "#6DA5A3",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: -100,
    },
    disabledButton: {
        backgroundColor: "#B0C4B1",
    },
    doneText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
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

export default CanvasSizeScreen;
