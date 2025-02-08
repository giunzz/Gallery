import { Skia, vec } from "@shopify/react-native-skia";
import { useCallback, useRef, useState } from "react";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Tools } from "../utils/Tool";

const useCanvas = ({ paintStyle, tool }) => {
    const [shapes, setShapes] = useState([]);
    const [trash, putInTrash] = useState([]);
    const [, reRender] = useState(0);
    const currentShape = useRef(null);
    const sharedValueX = useSharedValue(5);
    const sharedValueY = useSharedValue(5);
    const sharedValue = useSharedValue(null);

    const createShape = (x, y) => {
        switch (tool) {
            case Tools.square:
                return {
                    tool,
                    coordinates: { x, y, width: sharedValueX, height: sharedValueY },
                    ...paintStyle,
                };
            case Tools.circle:
                return { tool, coordinates: { cx: x, cy: y, r: sharedValueX }, ...paintStyle };
            case Tools.line:
                sharedValue.value = vec(x, y);
                return {
                    tool,
                    coordinates: { p1: vec(x, y), p2: sharedValue },
                    ...paintStyle,
                };
            default: {
                const path = Skia.Path.Make();
                path.moveTo(x, y);
                return { tool, coordinates: { path }, ...paintStyle };
            }
        }
    };

    const onDrawingStart = useCallback((event) => {
        const { x, y } = event;
        currentShape.current = createShape(x, y);
        reRender((old) => old + 1);
    }, [tool, paintStyle]);

    const onDrawingActive = useCallback((event) => {
        const { x, y } = event;
        const shape = currentShape.current;
        if (!shape) return;

        if (tool === Tools.circle) {
            const deltaX = shape.coordinates.cx - x;
            const deltaY = shape.coordinates.cy - y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            currentShape.current.coordinates.r.value = withSpring(distance);
        } else if (tool === Tools.square) {
            currentShape.current.coordinates.width.value = withSpring(x - shape.coordinates.x);
            currentShape.current.coordinates.height.value = withSpring(y - shape.coordinates.y);
        } else if (tool === Tools.pen) {
            const lastPoint = currentShape.current.coordinates.path.getLastPt();
            const xMid = (lastPoint.x + x) / 2;
            const yMid = (lastPoint.y + y) / 2;
            currentShape.current.coordinates.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
        } else if (tool === Tools.line) {
            currentShape.current.coordinates.p2.value = withSpring(vec(x, y));
        }
    }, [tool, paintStyle]);

    const onDrawingEnd = useCallback(() => {
        setShapes((shapes) => {
            if (!currentShape.current) return shapes;

            if (tool === Tools.circle) {
                currentShape.current.coordinates.r = currentShape.current.coordinates.r.value;
            } else if (tool === Tools.square) {
                currentShape.current.coordinates.width = currentShape.current.coordinates.width.value;
                currentShape.current.coordinates.height = currentShape.current.coordinates.height.value;
            } else if (tool === Tools.line) {
                currentShape.current.coordinates.p2 = vec(
                    currentShape.current.coordinates.p2.value.x,
                    currentShape.current.coordinates.p2.value.y
                );
            }

            sharedValueX.value = 5;
            sharedValueY.value = 5;
            sharedValue.value = vec(5, 5);
            return [...shapes, currentShape.current];
        });
        putInTrash([]);
        currentShape.current = null;
    }, [tool, paintStyle]);

    const touchHandler = Gesture.Pan()
        .onStart(onDrawingStart)
        .onUpdate(onDrawingActive)
        .onEnd(onDrawingEnd);

    return {
        undo: () => {
            if (shapes.length === 0) return;
            const shape = shapes.pop();
            putInTrash((old) => [...old, shape]);
            setShapes([...shapes]);
        },
        redo: () => {
            if (trash.length === 0) return;
            const shape = trash.pop();
            setShapes((old) => [...old, shape]);
            putInTrash([...trash]);
        },
        onClear: () => {
            setShapes([]);
            putInTrash([]);
        },
        touchHandler,
        shapes,
        currentShape: currentShape.current,
    };
};

export default useCanvas;
