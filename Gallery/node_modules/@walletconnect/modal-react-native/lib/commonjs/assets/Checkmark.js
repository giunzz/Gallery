"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SvgCheckmark = props => /*#__PURE__*/React.createElement(_reactNativeSvg.default, _extends({
  width: 16,
  height: 16,
  fill: "none",
  viewBox: "0 0 16 16"
}, props), /*#__PURE__*/React.createElement(_reactNativeSvg.Path, {
  fill: props.fill || '#fff',
  fillRule: "evenodd",
  d: "M13.653 2.132a.75.75 0 0 1 .233 1.035L7.319 13.535a1 1 0 0 1-1.625.09L2.162 9.21a.75.75 0 0 1 1.172-.937l2.874 3.593a.25.25 0 0 0 .406-.023l6.004-9.48a.75.75 0 0 1 1.035-.232Z",
  clipRule: "evenodd"
}));
var _default = SvgCheckmark;
exports.default = _default;
//# sourceMappingURL=Checkmark.js.map