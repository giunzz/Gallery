import { useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import useTheme from '../hooks/useTheme';
import SearchIcon from '../assets/Search';
function SearchBar(_ref) {
  let {
    onChangeText,
    style
  } = _ref;
  const Theme = useTheme();
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: () => {
      var _inputRef$current;
      return (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    },
    style: [styles.container, {
      backgroundColor: Theme.background3,
      borderColor: focused ? Theme.accent : Theme.overlayThin
    }, style]
  }, /*#__PURE__*/React.createElement(SearchIcon, {
    style: styles.icon
  }), /*#__PURE__*/React.createElement(TextInput, {
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
const styles = StyleSheet.create({
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
export default SearchBar;
//# sourceMappingURL=SearchBar.js.map