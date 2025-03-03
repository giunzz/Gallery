"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SvgWarning = props => /*#__PURE__*/React.createElement(_reactNativeSvg.default, _extends({
  width: 18,
  height: 16,
  viewBox: "0 0 18 16",
  fill: "none"
}, props), /*#__PURE__*/React.createElement(_reactNativeSvg.Path, {
  fill: props.fill || '#fff',
  d: "M10 5.083a1 1 0 0 0-2 0v2.334a1 1 0 0 0 2 0V5.083Zm-1 7A1.167 1.167 0 1 0 9 9.75a1.167 1.167 0 0 0 0 2.333Z"
}), /*#__PURE__*/React.createElement(_reactNativeSvg.Path, {
  fill: props.fill || '#fff',
  fillRule: "evenodd",
  d: "M9 0A8.001 8.001 0 0 0 .998 8 8 8 0 0 0 9 16a8.001 8.001 0 0 0 8.003-8c0-4.418-3.583-8-8.003-8ZM2.998 8A6 6 0 0 1 9 2a6.001 6.001 0 1 1 0 12 6.001 6.001 0 0 1-6.002-6Z",
  clipRule: "evenodd"
}));
var _default = SvgWarning;
exports.default = _default;
//# sourceMappingURL=Warning.js.map