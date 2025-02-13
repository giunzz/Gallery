import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Canvas, Path, Skia} from '@shopify/react-native-skia';

const COLORS = ['black', 'red', 'blue', 'green', 'orange'];

const ExploreMain = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [previousPoint, setPreviousPoint] = useState(null);
  // Use a ref to store the last computed midpoint for smoothing.
  const lastMidPointRef = useRef(null);

  const onTouchStart = event => {
    if (isDrawing) return;
    const {locationX, locationY} = event.nativeEvent;
    console.log('onTouchStart:', locationX, locationY);
    setIsDrawing(true);
    setHasMoved(false);
    const start = {x: locationX, y: locationY};
    setStartPoint(start);
    setPreviousPoint(start);
    lastMidPointRef.current = null; // reset the last midpoint
    const path = Skia.Path.Make();
    path.moveTo(locationX, locationY);
    setCurrentPath(path);
  };

  const onTouchMove = event => {
    if (!isDrawing || !currentPath || !previousPoint) return;
    const {locationX, locationY} = event.nativeEvent;
    console.log('onTouchMove:', locationX, locationY);
    setHasMoved(true);
    const currentPoint = {x: locationX, y: locationY};
    // Compute the midpoint between the previous touch and current touch
    const midPoint = {
      x: (previousPoint.x + currentPoint.x) / 2,
      y: (previousPoint.y + currentPoint.y) / 2,
    };
    // If this is the first segment, we simply quadTo from previousPoint to midPoint.
    // Otherwise, we continue smoothing from the last midpoint.
    currentPath.quadTo(
      previousPoint.x,
      previousPoint.y,
      midPoint.x,
      midPoint.y,
    );
    // Store the current midPoint for the next segment.
    lastMidPointRef.current = midPoint;
    setPreviousPoint(currentPoint);
    // Copy the updated path to trigger re-render.
    setCurrentPath(currentPath.copy());
  };

  const onTouchEnd = () => {
    if (!isDrawing || !currentPath) return;
    // If no movement occurred, add a small dot.
    if (!hasMoved && startPoint) {
      console.log('Single tap detected, drawing a dot');
      currentPath.addCircle(startPoint.x, startPoint.y, 2);
    }
    console.log('onTouchEnd:', currentPath.toSVGString());
    // Optionally, you can ensure the final segment is drawn.
    if (hasMoved && previousPoint) {
      currentPath.lineTo(previousPoint.x, previousPoint.y);
    }
    setPaths(prevPaths => [
      ...prevPaths,
      {path: currentPath, color: selectedColor},
    ]);
    // Reset all drawing state.
    setCurrentPath(null);
    setIsDrawing(false);
    setHasMoved(false);
    setStartPoint(null);
    setPreviousPoint(null);
    lastMidPointRef.current = null;
  };

  const clearCanvas = () => {
    console.log('clearCanvas');
    setPaths([]);
    setCurrentPath(null);
    setIsDrawing(false);
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {/* Render completed paths */}
        {paths.map((p, index) => (
          <Path
            key={`path-${index}`}
            path={p.path}
            style="stroke"
            strokeWidth={4}
            color={p.color}
          />
        ))}
        {/* Render current path being drawn */}
        {currentPath && (
          <Path
            path={currentPath}
            style="stroke"
            strokeWidth={4}
            color={selectedColor}
          />
        )}
      </Canvas>

      <View
        style={styles.touchArea}
        onStartShouldSetResponder={() => true}
        onResponderGrant={onTouchStart}
        onResponderMove={onTouchMove}
        onResponderRelease={onTouchEnd}
        onResponderTerminate={onTouchEnd}
      />

      <View style={styles.controls}>
        {COLORS.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              {
                backgroundColor: color,
                borderWidth: selectedColor === color ? 3 : 0,
                borderColor: '#fff',
              },
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
        <TouchableOpacity style={styles.clearButton} onPress={clearCanvas}>
          <View style={styles.clearText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  canvas: {flex: 1},
  touchArea: {
    ...StyleSheet.absoluteFillObject,
  },
  controls: {
    flexDirection: 'row',
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
  clearButton: {
    width: 60,
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  clearText: {
    width: 30,
    height: 5,
    backgroundColor: '#fff',
  },
});

export default ExploreMain;
