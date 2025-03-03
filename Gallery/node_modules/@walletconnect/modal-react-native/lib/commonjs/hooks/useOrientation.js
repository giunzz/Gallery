"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOrientation = useOrientation;
var _reactNative = require("react-native");
function useOrientation() {
  const window = (0, _reactNative.useWindowDimensions)();
  return {
    width: window.width,
    height: window.height,
    isPortrait: window.height >= window.width
  };
}
//# sourceMappingURL=useOrientation.js.map