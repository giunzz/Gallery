function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import Svg, { Path } from 'react-native-svg';
const SvgCheckmark = props => /*#__PURE__*/React.createElement(Svg, _extends({
  width: 16,
  height: 16,
  fill: "none",
  viewBox: "0 0 16 16"
}, props), /*#__PURE__*/React.createElement(Path, {
  fill: props.fill || '#fff',
  fillRule: "evenodd",
  d: "M13.653 2.132a.75.75 0 0 1 .233 1.035L7.319 13.535a1 1 0 0 1-1.625.09L2.162 9.21a.75.75 0 0 1 1.172-.937l2.874 3.593a.25.25 0 0 0 .406-.023l6.004-9.48a.75.75 0 0 1 1.035-.232Z",
  clipRule: "evenodd"
}));
export default SvgCheckmark;
//# sourceMappingURL=Checkmark.js.map