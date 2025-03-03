"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDynamicLoadingErrorCallback = exports.setDynamicLoadingEnabled = exports.isDynamicLoadingSupported = exports.isDynamicLoadingEnabled = exports.getErrorCallback = void 0;
const hasNecessaryExpoModules = !!globalThis.expo?.modules?.ExpoAsset && !!globalThis.expo?.modules?.ExpoFontLoader;
const hasNecessaryExpoFeatures = hasNecessaryExpoModules && typeof globalThis.expo?.modules.ExpoFontLoader.getLoadedFonts === 'function';
let dynamicFontLoadingEnabled = hasNecessaryExpoFeatures;
const isDynamicLoadingSupported = () => hasNecessaryExpoFeatures;

/**
 * Set whether dynamic loading of fonts is enabled.
 * Currently, the presence of Expo Asset and Font Loader modules is a prerequisite for enabling.
 * In the future, React Native core apis will be used for dynamic font loading.
 *
 * @param value - whether dynamic loading of fonts is enabled
 * @returns `true` if dynamic loading of fonts was successfully set. `false` otherwise.
 * */
exports.isDynamicLoadingSupported = isDynamicLoadingSupported;
const setDynamicLoadingEnabled = value => {
  if (!hasNecessaryExpoFeatures) {
    if (process.env.NODE_ENV !== 'production' && !!value) {
      const message = hasNecessaryExpoModules ? 'Expo is installed, but does not support dynamic font loading. Make sure to use Expo SDK 52 or newer.' : 'Necessary Expo modules not found. Dynamic font loading is not available on Web or when necessary Expo modules are not present.';
      console.error(message); // eslint-disable-line no-console
    }
    return false;
  }
  dynamicFontLoadingEnabled = !!value;
  return true;
};

/**
 * Whether dynamic loading of fonts is enabled.
 * */
exports.setDynamicLoadingEnabled = setDynamicLoadingEnabled;
const isDynamicLoadingEnabled = () => dynamicFontLoadingEnabled;
exports.isDynamicLoadingEnabled = isDynamicLoadingEnabled;
let dynamicLoadingErrorCallback;

/**
 * Set a callback to be called when an error occurs during dynamic font loading.
 * */
const setDynamicLoadingErrorCallback = callback => {
  dynamicLoadingErrorCallback = callback;
};
exports.setDynamicLoadingErrorCallback = setDynamicLoadingErrorCallback;
const getErrorCallback = () => dynamicLoadingErrorCallback;
exports.getErrorCallback = getErrorCallback;
//# sourceMappingURL=dynamic-loading-setting.js.map