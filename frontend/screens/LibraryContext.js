import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
    const [libraryItems, setLibraryItems] = useState([]);

    useEffect(() => {
        const loadLibrary = async () => {
            try {
                const savedItems = await AsyncStorage.getItem("libraryItems");
                if (savedItems) {
                    setLibraryItems(JSON.parse(savedItems));
                }
            } catch (error) {
                console.error("Error loading library items from AsyncStorage", error);
            }
        };
        loadLibrary();
    }, []);

    const addItemToLibrary = async (item) => {
        setLibraryItems((prevItems) => {
            const exists = prevItems.some((i) => i.id === item.id);
            if (!exists) {
                const updatedLibrary = [...prevItems, item];
                AsyncStorage.setItem("libraryItems", JSON.stringify(updatedLibrary)).catch((error) => {
                    console.error("Error saving item to AsyncStorage", error);
                });
                return updatedLibrary;
            }
            return prevItems;
        });
    };

    const resetLibraryWithNewItems = async (newItems) => {
        try {
            setLibraryItems(newItems);
            await AsyncStorage.setItem("libraryItems", JSON.stringify(newItems));
        } catch (error) {
            console.error("Error resetting library with new items", error);
        }
    };

    return (
        <LibraryContext.Provider value={{ libraryItems, addItemToLibrary, resetLibraryWithNewItems }}>
            {children}
        </LibraryContext.Provider>
    );
};
