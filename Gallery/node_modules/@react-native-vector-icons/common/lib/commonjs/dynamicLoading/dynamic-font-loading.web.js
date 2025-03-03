"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynamicLoader = void 0;
/**
 * dynamic font loading isn't supported on web
 * */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadFontAsync = async (_fontFamily, _fontSource) => undefined;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isLoaded = _fontFamily => true;
const dynamicLoader = exports.dynamicLoader = {
  isLoaded,
  loadFontAsync
};
//# sourceMappingURL=dynamic-font-loading.web.js.map