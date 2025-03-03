function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { Text as RNText } from 'react-native';
import useTheme from '../hooks/useTheme';
function Text(_ref) {
  let {
    children,
    style,
    ...props
  } = _ref;
  const Theme = useTheme();
  return /*#__PURE__*/React.createElement(RNText, _extends({
    style: [{
      color: Theme.foreground1
    }, style]
  }, props), children);
}
export default Text;
//# sourceMappingURL=Text.js.map