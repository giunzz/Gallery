import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Alert,
    SafeAreaView,
} from 'react-native';
import {
    Canvas,
    Path,
    Skia,
    useImage,
    Image as SkiaImage,
} from '@shopify/react-native-skia';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { getToken, addPicture } from '../services/apiService';
import { captureRef } from 'react-native-view-shot';

const COLORS = ['black', 'red', 'blue', 'green', 'orange'];

const Drawing = ({ navigation, route }) => {
    const artwork = route?.params?.artwork ?? { image: null };
    const [paths, setPaths] = useState([]);
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [isErasing, setIsErasing] = useState(false);
    const [showColorTable, setShowColorTable] = useState(false);
    const [isDrawingEnabled, setIsDrawingEnabled] = useState(true);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const canvasRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const loadedImage = useImage(artwork ? artwork.image : null);
    const canvasContainerRef = useRef(null);


    const baseScale = useSharedValue(1);
    const pinchScale = useSharedValue(1);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const drawingModeSV = useSharedValue(isDrawingEnabled);

    useEffect(() => {
        drawingModeSV.value = isDrawingEnabled;
    }, [isDrawingEnabled]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: baseScale.value * pinchScale.value },
        ],
    }));

    const pinchGesture = Gesture.Pinch()
        .onUpdate(event => {
            pinchScale.value = event.scale;
        })
        .onEnd(() => {
            baseScale.value = baseScale.value * pinchScale.value;
            pinchScale.value = 1;
        });

    const panGesture = Gesture.Pan()
        .onUpdate(event => {
            translateX.value = offsetX.value + event.translationX;
            translateY.value = offsetY.value + event.translationY;
        })
        .onEnd(() => {
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
        });

    const activeGesture = isDrawingEnabled
        ? pinchGesture
        : Gesture.Simultaneous(pinchGesture, panGesture);

    const handleTouchStart = event => {
        if (!isDrawingEnabled) return;
        const { locationX, locationY } = event.nativeEvent;
        if (isErasing) {
            eraseAtPoint(locationX, locationY);
            return;
        }
        const newPath = Skia.Path.Make();
        newPath.moveTo(locationX, locationY);
        setPaths(prev => [
            ...prev,
            {
                path: newPath,
                color: selectedColor,
                points: [{ x: locationX, y: locationY }],
            },
        ]);
    };

    const handleTouchMove = event => {
        if (!isDrawingEnabled) return;
        const { locationX, locationY } = event.nativeEvent;
        if (isErasing) {
            eraseAtPoint(locationX, locationY);
            return;
        }
        setPaths(prev => {
            if (prev.length === 0) return prev;
            const newPaths = [...prev];
            const lastPath = newPaths[newPaths.length - 1];
            const pts = lastPath.points;
            const newPts = [...pts, { x: locationX, y: locationY }];
            const newPath = Skia.Path.Make();
            newPath.moveTo(pts[0].x, pts[0].y);
            if (pts.length === 1) {
                newPath.lineTo(locationX, locationY);
            } else {
                for (let i = 1; i < pts.length; i++) {
                    const prevPt = pts[i - 1];
                    const currPt = pts[i];
                    const midX = (prevPt.x + currPt.x) / 2;
                    const midY = (prevPt.y + currPt.y) / 2;
                    newPath.quadTo(prevPt.x, prevPt.y, midX, midY);
                }
                const lastPt = pts[pts.length - 1];
                const midX = (lastPt.x + locationX) / 2;
                const midY = (lastPt.y + locationY) / 2;
                newPath.quadTo(lastPt.x, lastPt.y, midX, midY);
            }
            newPaths[newPaths.length - 1] = {
                ...lastPath,
                path: newPath,
                points: newPts,
            };
            return newPaths;
        });
    };

    const handleTouchEnd = () => {
        if (!isDrawingEnabled) return;
        if (isErasing) {
            setIsErasing(false);
            return;
        }
        setPaths(prev => {
            if (prev.length === 0) return prev;
            const newPaths = [...prev];
            const lastPath = newPaths[newPaths.length - 1];
            if (lastPath.points.length === 1) {
                const { x, y } = lastPath.points[0];
                lastPath.path.addCircle(x, y, 2);
            }
            return newPaths;
        });
    };

    const eraseAtPoint = (x, y) => {
        setPaths(prev =>
            prev.filter(({ path }) => {
                const bounds = path.getBounds();
                return !(
                    x >= bounds.x - 3 &&
                    x <= bounds.x + bounds.width + 3 &&
                    y >= bounds.y - 3 &&
                    y <= bounds.y + bounds.height + 3
                );
            }),
        );
    };

    const handleColorSelect = color => {
        setSelectedColor(color);
        setIsErasing(false);
        setShowColorTable(false);
    };

    const clearCanvas = () => setPaths([]);

    const saveImage = async () => {
        if (!canvasContainerRef.current) {
            Alert.alert("Error", "No image to save.");
            return;
        }
    
        try {
            setUploading(true);
    
            // Capture the canvas as an image
            const uri = await captureRef(canvasContainerRef, {
                format: 'png',
                quality: 1,
            });
    
            if (!uri) {
                Alert.alert("Error", "Failed to capture image.");
                setUploading(false);
                return;
            }
    
            setImageUrl(uri);
    
            const token = await getToken();
            if (!token) {
                Alert.alert("Error", "Authentication required. Please log in again.");
                setUploading(false);
                return;
            }
    
            const uploadResponse = await addPicture(uri, token);
            console.log("Upload Response:", uploadResponse);
            if (uploadResponse) {
                Alert.alert("Success", "Image saved to your library.", [
                    { text: "OK", onPress: () => navigation.navigate('ResultDraw' ,{item: uploadResponse}) }
                ]);
            } else {
                Alert.alert("Error", "Failed to save image.");
            }
        } catch (error) {
            console.error("Error saving image:", error);
            Alert.alert("Error", "Error saving image. Please try again.");
        } finally {
            setUploading(false);
        }
    };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                <GestureDetector gesture={activeGesture}>
                                <View ref={canvasContainerRef} style={styles.canvasContainer}>
                    <Canvas
                        style={styles.canvas}
                        onLayout={(event) => {
                            const { width, height } = event.nativeEvent.layout;
                            setCanvasSize({ width, height });
                        }}>
                        {loadedImage && canvasSize.width && canvasSize.height && (
                            <SkiaImage
                                image={loadedImage}
                                x={0}
                                y={0}
                                width={canvasSize.width}
                                height={canvasSize.height}
                            />
                        )}
                        {paths.map((p, index) => (
                            <Path
                                key={`path-${index}`}
                                path={p.path}
                                style="stroke"
                                strokeWidth={3}
                                color={p.color}
                            />
                        ))}
                    </Canvas>
                </View>

                </GestureDetector>
                
                <View
                    style={styles.touchArea}
                    onStartShouldSetResponder={() => true}
                    onResponderGrant={handleTouchStart}
                    onResponderMove={handleTouchMove}
                    onResponderRelease={handleTouchEnd}
                />

                <View style={styles.controls}>
                    <TouchableOpacity
                        style={styles.toggleDrawingButton}
                        onPress={() => setIsDrawingEnabled(prev => !prev)}>
                        <Text style={styles.toggleDrawingText}>
                            {isDrawingEnabled ? 'Drawing On' : 'Drawing Off'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.colorButton, { backgroundColor: selectedColor }]}
                        onPress={() => setShowColorTable(!showColorTable)}
                    />
                    <TouchableOpacity
                        style={[styles.eraserButton, isErasing ? styles.eraserActive : {}]}
                        onPress={() => setIsErasing(!isErasing)}>
                        <Text style={styles.eraserText}>
                            {isErasing ? 'Erasing' : 'Eraser'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.clearButton} onPress={clearCanvas}>
                        <Text style={styles.clearText}>Clear</Text>
                    </TouchableOpacity>
                </View>

                {showColorTable && (
                    <View style={styles.colorTable}>
                        {COLORS.map(color => (
                            <TouchableOpacity
                                key={color}
                                style={[
                                    styles.colorOption,
                                    {
                                        backgroundColor: color,
                                        borderWidth: selectedColor === color ? 3 : 0,
                                        borderColor: 'black',
                                    },
                                ]}
                                onPress={() => handleColorSelect(color)}
                            />
                        ))}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    canvasContainer: { flex: 1 },
    canvas: { flex: 1 },
    touchArea: { ...StyleSheet.absoluteFillObject },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5,
    },
    toggleDrawingButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    toggleDrawingText: { color: '#fff', fontWeight: 'bold' },
    eraserButton: {
        width: 80,
        height: 40,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
    },
    eraserActive: { backgroundColor: '#888' },
    eraserText: { color: '#fff', fontWeight: 'bold' },
    clearButton: {
        width: 60,
        height: 40,
        backgroundColor: '#d9534f',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
    },
    clearText: { color: '#fff', fontWeight: 'bold' },
    colorTable: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5,
    },
    saveButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        zIndex: 10,
    },
    saveButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default Drawing;