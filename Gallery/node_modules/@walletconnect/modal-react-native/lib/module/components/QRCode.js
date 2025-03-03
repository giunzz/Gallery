import { memo, useMemo } from 'react';
import { Svg } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import { QRCodeUtil } from '../utils/QRCodeUtil';
import WCLogo from '../assets/WCLogo';
import { DarkTheme, LightTheme } from '../constants/Colors';
function QRCode(_ref) {
  let {
    uri,
    size,
    theme = 'light'
  } = _ref;
  const Theme = theme === 'light' ? LightTheme : DarkTheme;
  const dots = useMemo(() => QRCodeUtil.generate(uri, size, size / 4, 'light'), [uri, size]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: LightTheme.background1
    }]
  }, /*#__PURE__*/React.createElement(Svg, {
    height: size,
    width: size
  }, dots), /*#__PURE__*/React.createElement(WCLogo, {
    width: size / 4,
    fill: Theme.accent,
    style: styles.logo
  }));
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    padding: 16,
    alignSelf: 'center'
  },
  logo: {
    position: 'absolute'
  }
});
export default /*#__PURE__*/memo(QRCode);
//# sourceMappingURL=QRCode.js.map