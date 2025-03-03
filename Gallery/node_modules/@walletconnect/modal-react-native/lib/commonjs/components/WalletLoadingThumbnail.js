"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const AnimatedRect = _reactNative.Animated.createAnimatedComponent(_reactNativeSvg.Rect);
function WalletLoadingThumbnail(_ref) {
  let {
    children,
    showError
  } = _ref;
  const Theme = (0, _useTheme.default)();
  const spinValue = (0, _react.useRef)(new _reactNative.Animated.Value(0));
  (0, _react.useEffect)(() => {
    const animation = _reactNative.Animated.timing(spinValue.current, {
      toValue: 1,
      duration: 1150,
      useNativeDriver: true,
      easing: _reactNative.Easing.linear
    });
    const loop = _reactNative.Animated.loop(animation);
    loop.start();
    return () => {
      loop.stop();
    };
  }, [spinValue]);
  const spin = spinValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -371]
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(_reactNativeSvg.default, {
    width: 110,
    height: 110,
    viewBox: "0 0 110 110",
    style: styles.loader
  }, /*#__PURE__*/React.createElement(AnimatedRect, {
    x: "2",
    y: "2",
    width: 106,
    height: 106,
    rx: 31,
    stroke: showError ? 'transparent' : Theme.accent,
    strokeWidth: 2,
    fill: "transparent",
    strokeDasharray: '116 255',
    strokeDashoffset: spin
  })), showError && /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.error, {
      borderColor: Theme.negative
    }]
  }), children);
}
const styles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    position: 'absolute'
  },
  error: {
    position: 'absolute',
    borderWidth: 2,
    height: 106,
    width: 106,
    borderRadius: 31
  }
});
var _default = WalletLoadingThumbnail;
exports.default = _default;
//# sourceMappingURL=WalletLoadingThumbnail.js.map