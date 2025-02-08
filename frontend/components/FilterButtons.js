import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategoryButton,
            ]}
            onPress={() => onSelectCategory(item)}
        >
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === item && styles.selectedCategoryText,
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.categoryContainer}>
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        paddingVertical: 10,
        backgroundColor: "#F8F8F8",
    },
    categoryList: {
        paddingHorizontal: 16,
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#79D7BE",
        marginRight: 10,
    },
    selectedCategoryButton: {
        backgroundColor: "#5E9D9F",
        borderColor: "#5E9D9F",
    },
    categoryText: {
        fontSize: 16,
        color: "#5E9D9F",
    },
    selectedCategoryText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});

export default CategoryFilter;
