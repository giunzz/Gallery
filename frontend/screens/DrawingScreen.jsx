import {View} from "react-native";
import Header from "../components/drawing/Header";
import {Canvas} from "@shopify/react-native-skia";
import Shape from "../components/drawing/Shape";
import Footer from "../components/drawing/Footer";
import useToolbar from "../hooks/useToolbar";
import useCanvas from "../hooks/useCanvas";
import { StyleSheet } from 'react-native';
import {GestureDetector} from "react-native-gesture-handler";
const DrawingScreen = () => {
    const { tool, setTool, ...headerTools } = useToolbar();
    const { paintStyle } = headerTools;
    const { shapes, touchHandler, currentShape, onClear, undo, redo } = useCanvas({
        paintStyle,
        tool,
    });
    return (
        <View style={styles.container}>
            <Header {...headerTools} />
            <GestureDetector gesture={touchHandler}>
                <Canvas style={styles.canvas}>
                    {shapes.map((shape, index) => (
                        <Shape key={index} {...shape} />
                    ))}
                    {currentShape && <Shape {...currentShape} />}
                </Canvas>
            </GestureDetector>
            <Footer onClear={onClear} tool={tool} setTool={setTool} undo={undo} redo={redo} />
        </View>
    )
}

export default DrawingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    canvas: {
        flex: 5,
    },
});