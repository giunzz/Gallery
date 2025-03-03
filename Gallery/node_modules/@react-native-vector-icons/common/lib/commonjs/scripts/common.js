"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFontPaths = void 0;
var _nodeFs = _interopRequireDefault(require("node:fs"));
var _nodePath = _interopRequireDefault(require("node:path"));
var _cliTools = require("@react-native-community/cli-tools");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getPackageJson = filename => {
  const packageData = _nodeFs.default.readFileSync(filename, 'utf-8');
  const packageJson = JSON.parse(packageData);
  return packageJson;
};
const getPackageFontDirectories = packageJsonFilename => {
  const rootPackageJson = getPackageJson(packageJsonFilename);
  const dependencies = Object.keys(rootPackageJson.dependencies || {});
  const packageDirs = [];
  dependencies.forEach(dependency => {
    const dir = (0, _cliTools.resolveNodeModuleDir)(packageJsonFilename, dependency);
    const packageJson = getPackageJson(`${dir}/package.json`);
    if (packageJson.keywords?.includes?.('react-native-vector-icons-icon')) {
      packageDirs.push(`${dir}/fonts`);
    }
  });
  return packageDirs;
};
const getLocalFontsDir = packageJsonFilename => {
  const rootPackageJson = getPackageJson(packageJsonFilename);
  const config = rootPackageJson.reactNativeVectorIcons || {};
  return `${_nodePath.default.dirname(packageJsonFilename)}/${config.fontDir || 'rnvi-fonts'}`;
};
const getFonts = fontDir => {
  if (!_nodeFs.default.existsSync(fontDir)) {
    return [];
  }
  const fonts = _nodeFs.default.readdirSync(fontDir);
  const fontPaths = fonts.map(font => `${fontDir}/${font}`);
  return fontPaths;
};
const getFontPaths = packageJsonFilename => {
  const packageDirs = getPackageFontDirectories(packageJsonFilename);
  packageDirs.push(getLocalFontsDir(packageJsonFilename));
  const fonts = packageDirs.map(getFonts);
  return fonts.flat();
};
exports.getFontPaths = getFontPaths;
//# sourceMappingURL=common.js.map