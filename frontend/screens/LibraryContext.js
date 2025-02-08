import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
    const [libraryItems, setLibraryItems] = useState([]);

    useEffect(() => {
        const loadLibrary = async () => {
            const savedItems = await AsyncStorage.getItem("libraryItems");
            if (savedItems) {
                setLibraryItems(JSON.parse(savedItems));
            }
        };
        loadLibrary();
    }, []);

    const addItemToLibrary = async (item) => {
        setLibraryItems((prevItems) => {
            const exists = prevItems.some((i) => i.id === item.id);
            if (!exists) {
                const updatedLibrary = [...prevItems, item];
                AsyncStorage.setItem("libraryItems", JSON.stringify(updatedLibrary));
                return updatedLibrary;
            }
            return prevItems;
        });
    };

    return (
        <LibraryContext.Provider value={{ libraryItems, addItemToLibrary }}>
            {children}
        </LibraryContext.Provider>
    );
};
