import React, { createContext } from 'react';

import { lightTheme, darkTheme } from './theme';
import ThemeContext from "./ThemeContext";


const ThemeProvider = ({ children }) => {
    //   const [theme, setTheme] = useState(lightTheme); // Default theme
    const theme = lightTheme;
    //   // Function to toggle theme
    //   const toggleTheme = () => {
    //     setTheme(theme === lightTheme ? darkTheme : lightTheme);
    //   };

    return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};
export default ThemeProvider;