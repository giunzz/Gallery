"use strict";

var _reactNative = require("react-native");
if (_reactNative.Platform.OS === 'android') {
  if (_reactNative.UIManager.setLayoutAnimationEnabledExperimental) {
    _reactNative.UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
//# sourceMappingURL=animations.js.map