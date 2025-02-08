import { useState } from 'react';
import {Tools} from "../utils/Tool";

const useToolbar = () => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [paintStyle, setPaintStyle] = useState({ strokeWidth: 2, color: 'black' });
    const [tool, setTool] = useState(Tools.pen);

    return {
        tool,
        showColorPicker,
        setShowColorPicker,
        setPaintStyle,
        paintStyle,
        setTool,
    };
};

export default useToolbar;