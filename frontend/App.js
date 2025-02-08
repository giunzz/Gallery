import {StyleSheet} from 'react-native';
import RectangleDrawing from './components/RectangleDrawing';
import ThemeProvider from "./theme/ThemeProvider";
import DrawingScreen from "./screens/DrawingScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function App() {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView>
                <ThemeProvider>
                    <DrawingScreen/>
                </ThemeProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
