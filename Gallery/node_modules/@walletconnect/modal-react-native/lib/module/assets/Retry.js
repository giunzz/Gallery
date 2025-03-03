function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import Svg, { Path } from 'react-native-svg';
const SvgRetry = props => /*#__PURE__*/React.createElement(Svg, _extends({
  width: 12,
  height: 16,
  viewBox: "0 0 12 16",
  fill: "none"
}, props), /*#__PURE__*/React.createElement(Path, {
  fill: "#fff",
  d: "M5.986 2.03A.75.75 0 0 0 4.926.97L1.601 4.293a1 1 0 0 0 0 1.415L4.925 9.03a.75.75 0 0 0 1.06-1.06L4.194 6.176a.25.25 0 0 1 .177-.427h2.086a4 4 0 1 1-3.931 4.746c-.077-.407-.405-.746-.82-.746-.414 0-.755.338-.699.749a5.501 5.501 0 1 0 5.45-6.249H4.37a.25.25 0 0 1-.177-.426L5.986 2.03Z"
}));
export default SvgRetry;
//# sourceMappingURL=Retry.js.map