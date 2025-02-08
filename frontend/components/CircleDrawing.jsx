import { Canvas, Circle } from "@shopify/react-native-skia";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

const CircleDrawing = () => {
  const [isFilled, setIsFilled] = useState(false); // Trạng thái có tô màu hay không
  const circle = { x: 150, y: 250, radius: 50 }; // Thông tin vòng tròn

  // Hàm xử lý khi nhấn vào vòng tròn
  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const distance = Math.sqrt(
      (locationX - circle.x) ** 2 + (locationY - circle.y) ** 2
    );

    // Nếu chạm vào vòng tròn, đổi trạng thái để tô màu
    if (distance <= circle.radius) {
      setIsFilled(true);
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {/* Canvas vẽ vòng tròn */}
      <Canvas style={styles.canvas}>
        <Circle
          cx={circle.x}
          cy={circle.y}
          r={circle.radius}
          color={isFilled ? "blue" : "red"} // Tô màu khi click
          strokeWidth={3}
          stroke="black" // Viền đen
        />
      </Canvas>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    width: 300,
    height: 500,
    backgroundColor: "#f0f0f0",
  },
});

export default CircleDrawing;
