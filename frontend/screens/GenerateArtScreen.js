import React, { useState, useLayoutEffect } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, 
    StyleSheet, SafeAreaView, ActivityIndicator, Alert 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GenerateArtScreen = ({ navigation, route }) => {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedCanvas, setSelectedCanvas] = useState(route.params?.selectedSize || ""); // Store canvas size
    const maxLength = 300;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("ExploreScreen")}>
                    <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            ),
            title: "Generate Art",
        });
    }, [navigation]);

    const handleGenerate = () => {
        if (prompt.trim() === "") {
            // Show an alert if the prompt is empty
            Alert.alert("No Prompt Entered", "Please enter a prompt before generating art.", [
                { text: "OK" },
            ]);
            return;
        }

        setLoading(true);
        // Navigate to the LoadingGenArt screen with the prompt and selected canvas
        navigation.navigate("LoadingGenArt", { prompt, selectedCanvas });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Input Section */}
            <Text style={styles.label}>Enter Prompt</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Please Describe Your Desired Artwork Here"
                    placeholderTextColor="white"
                    multiline
                    value={prompt}
                    onChangeText={setPrompt}
                    maxLength={maxLength}
                />
                <Text style={styles.charCount}>{prompt.length}/{maxLength}</Text>
                <TouchableOpacity onPress={() => setPrompt("")} style={styles.clearButton}>
                    <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoButton}>
                    <Ionicons name="help-circle-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Style & Canvas Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.optionText}>Choose Style</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.optionButton}
                    onPress={() => navigation.navigate("CanvasSizeScreen")}
                >
                    <Text style={styles.optionText}>Choose Canvas</Text>
                </TouchableOpacity>
            </View>

            {selectedCanvas ? (
                <Text style={styles.selectedCanvasText}>Selected Canvas: {selectedCanvas}</Text>
            ) : null}

            {/* Generate Button */}
            <TouchableOpacity 
                style={[styles.generateButton, prompt.length === 0 && styles.disabledButton]} 
                onPress={handleGenerate} 
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.generateText}>Generate</Text>}
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
        justifyContent: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    inputContainer: {
        backgroundColor: "#6DA5A3",
        borderRadius: 20,
        padding: 15,
        minHeight: 350,
        position: "relative",
        justifyContent: "center",
    },
    input: {
        color: "white",
        fontSize: 16,
        minHeight: 80,
    },
    charCount: {
        fontSize: 14,
        color: "#fff",
        position: "absolute",
        bottom: 5,
        right: 10,
    },
    clearButton: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 5,
        borderRadius: 50,
    },
    infoButton: {
        position: "absolute",
        top: 10,
        right: 35,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    optionButton: {
        backgroundColor: "#C2DAD0",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    optionText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    selectedCanvasText: {
        fontSize: 16,
        color: "#2A9D8F",
        marginTop: 10,
        textAlign: "center",
    },
    generateButton: {
        backgroundColor: "#6DA5A3",
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#B0C4B1",
    },
    generateText: {
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

export default GenerateArtScreen;