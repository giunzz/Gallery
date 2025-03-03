"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _valtio = require("valtio");
var _Colors = require("../constants/Colors");
var _ThemeCtrl = require("../controllers/ThemeCtrl");
function useTheme() {
  const {
    themeMode,
    accentColor
  } = (0, _valtio.useSnapshot)(_ThemeCtrl.ThemeCtrl.state);
  const Theme = themeMode === 'dark' ? _Colors.DarkTheme : _Colors.LightTheme;
  if (accentColor) return Object.assign(Theme, {
    accent: accentColor
  });
  return themeMode === 'dark' ? _Colors.DarkTheme : _Colors.LightTheme;
}
var _default = useTheme;
exports.default = _default;
//# sourceMappingURL=useTheme.js.map