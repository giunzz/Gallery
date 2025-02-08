import { Canvas, Rect } from '@shopify/react-native-skia';
import React, { useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';

const RectangleDrawing = () => {
  const [rectangles, setRectangles] = useState([]);
  const [currentRect, setCurrentRect] = useState(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentRect({
        x: locationX,
        y: locationY,
        width: 0,
        height: 0,
        color: 'red',
      });
    },
    onPanResponderMove: (evt, gestureState) => {
      if (currentRect) {
        setCurrentRect((prevRect) => ({
          ...prevRect,
          width: gestureState.dx,
          height: gestureState.dy,
        }));
      }
    },
    onPanResponderRelease: () => {
      if (currentRect) {
        setRectangles((prevRects) => [...prevRects, currentRect]);
        setCurrentRect(null);
      }
    },
  });

  const handlePress = (evt) => {
    const { locationX, locationY } = evt.nativeEvent;
    setRectangles((prevRects) =>
      prevRects.map((rect) => {
        if (
          locationX >= rect.x &&
          locationX <= rect.x + rect.width &&
          locationY >= rect.y &&
          locationY <= rect.y + rect.height
        ) {
          return { ...rect, color: rect.color === 'red' ? 'blue' : rect.color };
        }
        return rect;
      })
    );
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers} onStartShouldSetResponder={() => true} onResponderRelease={handlePress}>
      <Canvas style={styles.canvas}>
        {rectangles.map((rect, index) => (
          <Rect
            key={index}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            color={rect.color}
            strokeWidth={2}
            stroke="black"
          />
        ))}
        {currentRect && (
          <Rect
            x={currentRect.x}
            y={currentRect.y}
            width={currentRect.width}
            height={currentRect.height}
            color="red"
            strokeWidth={2}
            stroke="black"
          />
        )}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default RectangleDrawing;
