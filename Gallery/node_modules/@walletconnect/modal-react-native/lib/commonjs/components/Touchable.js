"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatedTouchable = _reactNative.Animated.createAnimatedComponent(_reactNative.TouchableOpacity);
function Touchable(_ref) {
  let {
    children,
    onPress,
    style,
    ...props
  } = _ref;
  const scale = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
  const styles = _reactNative.StyleSheet.flatten([style]);
  const onPressIn = () => {
    _reactNative.Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };
  const onPressOut = () => {
    _reactNative.Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };
  return /*#__PURE__*/React.createElement(AnimatedTouchable, _extends({
    onPressIn: onPressIn,
    onPressOut: onPressOut,
    onPress: onPress,
    activeOpacity: 0.8,
    style: [styles, {
      transform: [{
        scale
      }]
    }]
  }, props), children);
}
var _default = Touchable;
exports.default = _default;
//# sourceMappingURL=Touchable.js.map