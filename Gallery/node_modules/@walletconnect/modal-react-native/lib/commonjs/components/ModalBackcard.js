"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalBackcard = ModalBackcard;
exports.default = void 0;
var _reactNative = require("react-native");
var _LogoLockup = _interopRequireDefault(require("../assets/LogoLockup"));
var _Close = _interopRequireDefault(require("../assets/Close"));
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _Touchable = _interopRequireDefault(require("./Touchable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ModalBackcard(_ref) {
  let {
    onClose
  } = _ref;
  const Theme = (0, _useTheme.default)();
  return /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.placeholder, {
      backgroundColor: Theme.accent
    }]
  }), /*#__PURE__*/React.createElement(_reactNative.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(_LogoLockup.default, {
    width: 181,
    height: 28,
    fill: "white"
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(_Touchable.default, {
    style: [styles.buttonContainer, {
      backgroundColor: Theme.background1
    }],
    onPress: onClose
  }, /*#__PURE__*/React.createElement(_Close.default, {
    height: 11,
    fill: Theme.foreground1
  })))));
}
const styles = _reactNative.StyleSheet.create({
  placeholder: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 80,
    width: '100%',
    position: 'absolute'
  },
  container: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  row: {
    flexDirection: 'row'
  },
  buttonContainer: {
    height: 28,
    width: 28,
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  disconnectButton: {
    marginRight: 16
  }
});
var _default = ModalBackcard;
exports.default = _default;
//# sourceMappingURL=ModalBackcard.js.map