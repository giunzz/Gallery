"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SvgChevron = props => /*#__PURE__*/React.createElement(_reactNativeSvg.default, _extends({
  width: 6,
  height: 12,
  viewBox: "0 0 6 12",
  fill: "none"
}, props), /*#__PURE__*/React.createElement(_reactNativeSvg.Path, {
  fill: props.fill || '#fff',
  fillRule: "evenodd",
  d: "M1.378.1a.75.75 0 0 1 1.023.278l2.433 4.258a2.75 2.75 0 0 1 0 2.729l-2.433 4.258a.75.75 0 0 1-1.302-.745l2.433-4.257a1.25 1.25 0 0 0 0-1.24l-2.433-4.26A.75.75 0 0 1 1.378.1Z",
  clipRule: "evenodd"
}));
var _default = SvgChevron;
exports.default = _default;
//# sourceMappingURL=Chevron.js.map