import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import WCLogo from '../assets/LogoLockup';
import CloseIcon from '../assets/Close';
import useTheme from '../hooks/useTheme';
import Touchable from './Touchable';
export function ModalBackcard(_ref) {
  let {
    onClose
  } = _ref;
  const Theme = useTheme();
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
    style: [styles.placeholder, {
      backgroundColor: Theme.accent
    }]
  }), /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(WCLogo, {
    width: 181,
    height: 28,
    fill: "white"
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(Touchable, {
    style: [styles.buttonContainer, {
      backgroundColor: Theme.background1
    }],
    onPress: onClose
  }, /*#__PURE__*/React.createElement(CloseIcon, {
    height: 11,
    fill: Theme.foreground1
  })))));
}
const styles = StyleSheet.create({
  placeholder: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 80,
    width: '100%',
    position: 'absolute'
  },
  container: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  row: {
    flexDirection: 'row'
  },
  buttonContainer: {
    height: 28,
    width: 28,
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 4
        }
      },
      android: {
        borderColor: 'rgba(0, 0, 0, 0.12)',
        borderWidth: 1,
        elevation: 4
      }
    })
  },
  disconnectButton: {
    marginRight: 16
  }
});
export default ModalBackcard;
//# sourceMappingURL=ModalBackcard.js.map