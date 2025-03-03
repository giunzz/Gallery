"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Text(_ref) {
  let {
    children,
    style,
    ...props
  } = _ref;
  const Theme = (0, _useTheme.default)();
  return /*#__PURE__*/React.createElement(_reactNative.Text, _extends({
    style: [{
      color: Theme.foreground1
    }, style]
  }, props), children);
}
var _default = Text;
exports.default = _default;
//# sourceMappingURL=Text.js.map