"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNativeSvg = require("react-native-svg");
var _reactNative = require("react-native");
var _QRCodeUtil = require("../utils/QRCodeUtil");
var _WCLogo = _interopRequireDefault(require("../assets/WCLogo"));
var _Colors = require("../constants/Colors");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function QRCode(_ref) {
  let {
    uri,
    size,
    theme = 'light'
  } = _ref;
  const Theme = theme === 'light' ? _Colors.LightTheme : _Colors.DarkTheme;
  const dots = (0, _react.useMemo)(() => _QRCodeUtil.QRCodeUtil.generate(uri, size, size / 4, 'light'), [uri, size]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: _Colors.LightTheme.background1
    }]
  }, /*#__PURE__*/React.createElement(_reactNativeSvg.Svg, {
    height: size,
    width: size
  }, dots), /*#__PURE__*/React.createElement(_WCLogo.default, {
    width: size / 4,
    fill: Theme.accent,
    style: styles.logo
  }));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    padding: 16,
    alignSelf: 'center'
  },
  logo: {
    position: 'absolute'
  }
});
var _default = /*#__PURE__*/(0, _react.memo)(QRCode);
exports.default = _default;
//# sourceMappingURL=QRCode.js.map