function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import Svg, { Path } from 'react-native-svg';
const SvgClose = props => /*#__PURE__*/React.createElement(Svg, _extends({
  width: 12,
  height: 12,
  viewBox: "0 0 12 12",
  fill: "none"
}, props), /*#__PURE__*/React.createElement(Path, {
  fill: props.fill || '#fff',
  d: "M9.94 11A.75.75 0 1 0 11 9.94L7.414 6.353a.5.5 0 0 1 0-.708L11 2.061A.75.75 0 1 0 9.94 1L6.353 4.586a.5.5 0 0 1-.708 0L2.061 1A.75.75 0 0 0 1 2.06l3.586 3.586a.5.5 0 0 1 0 .708L1 9.939A.75.75 0 1 0 2.06 11l3.586-3.586a.5.5 0 0 1 .708 0L9.939 11Z"
}));
export default SvgClose;
//# sourceMappingURL=Close.js.map