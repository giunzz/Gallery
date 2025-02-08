import {createContext} from "react";
import {lightTheme} from "./theme";

const ThemeContext = createContext({ theme: lightTheme });

export default ThemeContext;