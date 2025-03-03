"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SvgRetry = props => /*#__PURE__*/React.createElement(_reactNativeSvg.default, _extends({
  width: 12,
  height: 16,
  viewBox: "0 0 12 16",
  fill: "none"
}, props), /*#__PURE__*/React.createElement(_reactNativeSvg.Path, {
  fill: "#fff",
  d: "M5.986 2.03A.75.75 0 0 0 4.926.97L1.601 4.293a1 1 0 0 0 0 1.415L4.925 9.03a.75.75 0 0 0 1.06-1.06L4.194 6.176a.25.25 0 0 1 .177-.427h2.086a4 4 0 1 1-3.931 4.746c-.077-.407-.405-.746-.82-.746-.414 0-.755.338-.699.749a5.501 5.501 0 1 0 5.45-6.249H4.37a.25.25 0 0 1-.177-.426L5.986 2.03Z"
}));
var _default = SvgRetry;
exports.default = _default;
//# sourceMappingURL=Retry.js.map