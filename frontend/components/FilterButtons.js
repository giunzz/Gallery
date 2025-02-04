import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterButtons = ({ selectedFilter, setSelectedFilter }) => {
    const filters = ["All", "Special", "Natural", "Mandalas", "Wellness"];

    return (
        <View style={styles.filterContainer}>
            {filters.map((filter) => (
                <TouchableOpacity
                    key={filter}
                    style={[
                        styles.filterButton,
                        selectedFilter === filter && styles.selectedFilterButton
                    ]}
                    onPress={() => setSelectedFilter(filter)}
                >
                    <Text style={[
                        styles.filterButtonText,
                        selectedFilter === filter && styles.selectedFilterButtonText
                    ]}>
                        {filter}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    filterButton: {
        borderWidth: 1,
        borderColor: '#79D7BE',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    selectedFilterButton: {
        backgroundColor: '#79D7BE',
    },
    filterButtonText: {
        color: 'gray',
    },
    selectedFilterButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default FilterButtons;
