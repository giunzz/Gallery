"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorTypeCanvasKit = void 0;
let ColorTypeCanvasKit = exports.ColorTypeCanvasKit = /*#__PURE__*/function (ColorTypeCanvasKit) {
  ColorTypeCanvasKit[ColorTypeCanvasKit["Unknown"] = 0] = "Unknown";
  // uninitialized
  ColorTypeCanvasKit[ColorTypeCanvasKit["Alpha_8"] = 1] = "Alpha_8";
  // pixel with alpha in 8-bit byte
  ColorTypeCanvasKit[ColorTypeCanvasKit["RGB_565"] = 2] = "RGB_565";
  // pixel with 5 bits red, 6 bits green, 5 bits blue, in 16-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["ARGB_4444"] = 3] = "ARGB_4444";
  // pixel with 4 bits for alpha, red, green, blue; in 16-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["RGBA_8888"] = 4] = "RGBA_8888";
  // pixel with 8 bits for red, green, blue, alpha; in 32-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["RGB_888x"] = 5] = "RGB_888x";
  // pixel with 8 bits each for red, green, blue; in 32-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["BGRA_8888"] = 6] = "BGRA_8888";
  // pixel with 8 bits for blue, green, red, alpha; in 32-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["RGBA_1010102"] = 7] = "RGBA_1010102";
  // 10 bits for red, green, blue; 2 bits for alpha; in 32-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["BGRA_1010102"] = 8] = "BGRA_1010102";
  // 10 bits for blue, green, red; 2 bits for alpha; in 32-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["RGB_101010x"] = 9] = "RGB_101010x";
  // pixel with 10 bits each for red, green, blue; in 32-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["BGR_101010x"] = 10] = "BGR_101010x";
  // pixel with 10 bits each for blue, green, red; in 32-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["BGR_101010x_XR"] = 11] = "BGR_101010x_XR";
  // pixel with 10 bits each for blue, green, red; in 32-bit word, extended range
  ColorTypeCanvasKit[ColorTypeCanvasKit["RGBA_10x6"] = 12] = "RGBA_10x6";
  // pixel with 10 used bits (most significant) followed by 6 unused
  ColorTypeCanvasKit[ColorTypeCanvasKit["Gray_8"] = 13] = "Gray_8";
  // pixel with grayscale level in 8-bit byte
  ColorTypeCanvasKit[ColorTypeCanvasKit["RGBA_F16Norm"] = 14] = "RGBA_F16Norm";
  // pixel with half floats in [0,1] for red, green, blue, alpha; in 64-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["RGBA_F16"] = 15] = "RGBA_F16";
  // pixel with half floats for red, green, blue, alpha; in 64-bit word
  ColorTypeCanvasKit[ColorTypeCanvasKit["RGBA_F32"] = 16] = "RGBA_F32"; // pixel using C float for red, green, blue, alpha; in 128-bit word
  return ColorTypeCanvasKit;
}({});
//# sourceMappingURL=ColorType.web.js.map