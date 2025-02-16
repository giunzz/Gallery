import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
    const [libraryItems, setLibraryItems] = useState([]);

    // Load library items from AsyncStorage when the component is mounted
    useEffect(() => {
        const loadLibrary = async () => {
            try {
                const savedItems = await AsyncStorage.getItem("libraryItems");
                if (savedItems) {
                    setLibraryItems(JSON.parse(savedItems));
                }
            } catch (error) {
                console.error("Failed to load library items from AsyncStorage", error);
            }
        };
        loadLibrary();
    }, []);

    // Add item to the library and update AsyncStorage
    const addItemToLibrary = async (item) => {
        setLibraryItems((prevItems) => {
            const exists = prevItems.some((i) => i.id === item.id);
            if (!exists) {
                const updatedLibrary = [...prevItems, item];
                try {
                    AsyncStorage.setItem("libraryItems", JSON.stringify(updatedLibrary));
                } catch (error) {
                    console.error("Failed to save item to AsyncStorage", error);
                }
                return updatedLibrary;
            }
            return prevItems;
        });
    };

    // Function to clear the library (reset context and AsyncStorage)
    const clearLibrary = async () => {
        try {
            await AsyncStorage.removeItem("libraryItems");
            setLibraryItems([]); // Clear the library context state
        } catch (error) {
            console.error("Failed to clear library from AsyncStorage", error);
        }
    };

    return (
        <LibraryContext.Provider value={{ libraryItems, addItemToLibrary, clearLibrary }}>
            {children}
        </LibraryContext.Provider>
    );
};
