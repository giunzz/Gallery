function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
function Touchable(_ref) {
  let {
    children,
    onPress,
    style,
    ...props
  } = _ref;
  const scale = useRef(new Animated.Value(1)).current;
  const styles = StyleSheet.flatten([style]);
  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };
  return /*#__PURE__*/React.createElement(AnimatedTouchable, _extends({
    onPressIn: onPressIn,
    onPressOut: onPressOut,
    onPress: onPress,
    activeOpacity: 0.8,
    style: [styles, {
      transform: [{
        scale
      }]
    }]
  }, props), children);
}
export default Touchable;
//# sourceMappingURL=Touchable.js.map