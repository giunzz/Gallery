"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _valtio = require("valtio");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _ToastCtrl = require("../controllers/ToastCtrl");
var _Checkmark = _interopRequireDefault(require("../assets/Checkmark"));
var _Warning = _interopRequireDefault(require("../assets/Warning"));
var _Text = _interopRequireDefault(require("./Text"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Toast() {
  const Theme = (0, _useTheme.default)();
  const {
    open,
    message,
    variant
  } = (0, _valtio.useSnapshot)(_ToastCtrl.ToastCtrl.state);
  const toastOpacity = (0, _react.useMemo)(() => new _reactNative.Animated.Value(0), []);
  const Icon = variant === 'success' ? _Checkmark.default : _Warning.default;
  const iconColor = variant === 'success' ? Theme.accent : Theme.negative;
  (0, _react.useEffect)(() => {
    if (open) {
      _reactNative.Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      }).start();
      setTimeout(() => {
        _reactNative.Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }).start(() => {
          _ToastCtrl.ToastCtrl.closeToast();
        });
      }, 2200);
    }
  }, [open, toastOpacity]);
  return open ? /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.container, {
      backgroundColor: Theme.glass,
      borderColor: Theme.overlayThin,
      opacity: toastOpacity
    }]
  }, /*#__PURE__*/React.createElement(Icon, {
    width: 16,
    fill: iconColor,
    style: styles.icon
  }), /*#__PURE__*/React.createElement(_Text.default, {
    style: styles.text,
    numberOfLines: 1
  }, message)) : null;
}
const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    padding: 9,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    bottom: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    ..._reactNative.Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 4
        }
      },
      android: {
        borderColor: 'rgba(0, 0, 0, 0.12)',
        borderWidth: 1,
        elevation: 4
      }
    })
  },
  icon: {
    marginRight: 6
  },
  text: {
    fontWeight: '600'
  }
});
var _default = Toast;
exports.default = _default;
//# sourceMappingURL=Toast.js.map