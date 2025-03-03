function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import Svg, { Path } from 'react-native-svg';
const SvgChevron = props => /*#__PURE__*/React.createElement(Svg, _extends({
  width: 6,
  height: 12,
  viewBox: "0 0 6 12",
  fill: "none"
}, props), /*#__PURE__*/React.createElement(Path, {
  fill: props.fill || '#fff',
  fillRule: "evenodd",
  d: "M1.378.1a.75.75 0 0 1 1.023.278l2.433 4.258a2.75 2.75 0 0 1 0 2.729l-2.433 4.258a.75.75 0 0 1-1.302-.745l2.433-4.257a1.25 1.25 0 0 0 0-1.24l-2.433-4.26A.75.75 0 0 1 1.378.1Z",
  clipRule: "evenodd"
}));
export default SvgChevron;
//# sourceMappingURL=Chevron.js.map