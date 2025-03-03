"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _Search = _interopRequireDefault(require("../assets/Search"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function SearchBar(_ref) {
  let {
    onChangeText,
    style
  } = _ref;
  const Theme = (0, _useTheme.default)();
  const inputRef = (0, _react.useRef)(null);
  const [focused, setFocused] = (0, _react.useState)(false);
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    onPress: () => {
      var _inputRef$current;
      return (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    },
    style: [styles.container, {
      backgroundColor: Theme.background3,
      borderColor: focused ? Theme.accent : Theme.overlayThin
    }, style]
  }, /*#__PURE__*/React.createElement(_Search.default, {
    style: styles.icon
  }), /*#__PURE__*/React.createElement(_reactNative.TextInput, {
    autoCapitalize: "none",
    autoComplete: "off",
    autoCorrect: false,
    spellCheck: false,
    ref: inputRef,
    placeholder: "Search wallets",
    onChangeText: onChangeText,
    returnKeyType: "search",
    placeholderTextColor: Theme.foreground2,
    clearButtonMode: "while-editing",
    cursorColor: Theme.accent,
    disableFullscreenUI: true,
    style: [styles.input, {
      color: Theme.foregroundInverse
    }],
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  }));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 100,
    height: 28,
    padding: 4,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    marginHorizontal: 8
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: 14
  }
});
var _default = SearchBar;
exports.default = _default;
//# sourceMappingURL=SearchBar.js.map