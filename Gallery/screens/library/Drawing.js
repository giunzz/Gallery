import React, {useState, useRef, useEffect} from 'react';
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
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Header from '../../components/AccountFlow/Header';

const COLORS = ['black', 'red', 'blue', 'green', 'orange'];

const Drawing = ({navigation, route}) => {
  const {artwork} = route.params;
  const [paths, setPaths] = useState([]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [isErasing, setIsErasing] = useState(false);
  const [showColorTable, setShowColorTable] = useState(false);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(true);
  const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});
  const canvasRef = useRef(null);

  // Load artwork image if available; otherwise, use null.
  const loadedImage = useImage(artwork ? artwork.image : null);

  // Shared values for pinch-to-zoom.
  const baseScale = useSharedValue(1);
  const pinchScale = useSharedValue(1);

  // Shared values for pan (drag).
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Mirror drawing mode into a shared value.
  const drawingModeSV = useSharedValue(isDrawingEnabled);
  useEffect(() => {
    drawingModeSV.value = isDrawingEnabled;
  }, [isDrawingEnabled]);

  // Animated style combining translation and scale.
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: baseScale.value * pinchScale.value},
    ],
  }));

  // Pinch gesture – always active, so you can zoom in/out even when drawing.
  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      pinchScale.value = event.scale;
    })
    .onEnd(() => {
      baseScale.value = baseScale.value * pinchScale.value;
      pinchScale.value = 1;
    });

  // Pan gesture – only active when drawing mode is off.
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = offsetX.value + event.translationX;
      translateY.value = offsetY.value + event.translationY;
    })
    .onEnd(() => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    });

  // If drawing is enabled, only allow pinch. If off, allow both pinch and pan.
  const activeGesture = isDrawingEnabled
    ? pinchGesture
    : Gesture.Simultaneous(pinchGesture, panGesture);

  // Drawing touch handlers.
  const handleTouchStart = event => {
    if (!isDrawingEnabled) return;
    const {locationX, locationY} = event.nativeEvent;
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
        points: [{x: locationX, y: locationY}],
      },
    ]);
  };

  const handleTouchMove = event => {
    if (!isDrawingEnabled) return;
    const {locationX, locationY} = event.nativeEvent;
    if (isErasing) {
      eraseAtPoint(locationX, locationY);
      return;
    }
    setPaths(prev => {
      if (prev.length === 0) return prev;
      const newPaths = [...prev];
      const lastPath = newPaths[newPaths.length - 1];
      const pts = lastPath.points;
      const newPts = [...pts, {x: locationX, y: locationY}];

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
        const {x, y} = lastPath.points[0];
        lastPath.path.addCircle(x, y, 2);
      }
      return newPaths;
    });
  };

  const eraseAtPoint = (x, y) => {
    setPaths(prev =>
      prev.filter(({path}) => {
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

  // Updated saveImage function: capture the canvas snapshot and replace artwork.image.
  const saveImage = () => {
    if (canvasRef.current) {
      const snapshot = canvasRef.current.makeImageSnapshot();
      console.log('Snapshot image:', snapshot);

      if (artwork) {
        // Create a new object instead of modifying artwork directly
        const updatedArtwork = {...artwork, image: snapshot};

        // Navigate with the updated object
        navigation.navigate('ArtworkDetail', {artwork: updatedArtwork});

        Alert.alert(
          'Image Saved!',
          'The artwork has been updated with your drawing.',
        );
      } else {
        Alert.alert('No Artwork', 'There is no artwork to update.');
      }
    }
    navigation.navigate('Library');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        goBack={true}
        title="Draw on Canvas"
        navigation={navigation}
        icon={false}
      />
      <View style={styles.container}>
        {/* Save button */}
        <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        {/* GestureDetector wraps the canvas with active gestures */}
        <GestureDetector gesture={activeGesture}>
          <Animated.View style={[styles.canvasContainer, animatedStyle]}>
            <Canvas
              ref={canvasRef}
              style={styles.canvas}
              onLayout={event => {
                const {width, height} = event.nativeEvent.layout;
                setCanvasSize({width, height});
              }}>
              {/* If artwork exists and the image is loaded, render it as the background */}
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
          </Animated.View>
        </GestureDetector>

        {/* Touch area for drawing */}
        <View
          style={styles.touchArea}
          onStartShouldSetResponder={() => true}
          onResponderGrant={handleTouchStart}
          onResponderMove={handleTouchMove}
          onResponderRelease={handleTouchEnd}
        />

        {/* Toggle drawing mode button placed next to color picker */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.toggleDrawingButton}
            onPress={() => setIsDrawingEnabled(prev => !prev)}>
            <Text style={styles.toggleDrawingText}>
              {isDrawingEnabled ? 'Drawing On' : 'Drawing Off'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.colorButton, {backgroundColor: selectedColor}]}
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
  container: {flex: 1, backgroundColor: '#fff'},
  canvasContainer: {flex: 1},
  canvas: {flex: 1},
  touchArea: {...StyleSheet.absoluteFillObject},
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
  toggleDrawingText: {color: '#fff', fontWeight: 'bold'},
  eraserButton: {
    width: 80,
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  eraserActive: {backgroundColor: '#888'},
  eraserText: {color: '#fff', fontWeight: 'bold'},
  clearButton: {
    width: 60,
    height: 40,
    backgroundColor: '#d9534f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  clearText: {color: '#fff', fontWeight: 'bold'},
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
  saveButtonText: {color: '#fff', fontWeight: 'bold'},
});

export default Drawing;
