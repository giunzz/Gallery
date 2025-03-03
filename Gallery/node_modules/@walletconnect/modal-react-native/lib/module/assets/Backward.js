function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import Svg, { Path } from 'react-native-svg';
const SvgBackward = props => /*#__PURE__*/React.createElement(Svg, _extends({
  width: 10,
  height: 18,
  viewBox: "0 0 10 18",
  fill: "none"
}, props), /*#__PURE__*/React.createElement(Path, {
  fill: props.fill || '#fff',
  fillRule: "evenodd",
  d: "M8.735.179a.75.75 0 0 1 .087 1.057L2.92 8.192a1.25 1.25 0 0 0 0 1.617l5.902 6.956a.75.75 0 1 1-1.144.97L1.776 10.78a2.75 2.75 0 0 1 0-3.559L7.678.265A.75.75 0 0 1 8.735.18Z",
  clipRule: "evenodd"
}));
export default SvgBackward;
//# sourceMappingURL=Backward.js.map