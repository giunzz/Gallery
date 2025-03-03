function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import Svg, { Path } from 'react-native-svg';
const SvgSearch = props => /*#__PURE__*/React.createElement(Svg, _extends({
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none"
}, props), /*#__PURE__*/React.createElement(Path, {
  fill: "#949E9E",
  fillRule: "evenodd",
  d: "M10.432 11.492c-.354-.353-.91-.382-1.35-.146a5.5 5.5 0 1 1 2.265-2.265c-.237.441-.208.997.145 1.35l3.296 3.296a.75.75 0 1 1-1.06 1.061l-3.296-3.296Zm.06-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  clipRule: "evenodd"
}));
export default SvgSearch;
//# sourceMappingURL=Search.js.map