"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QRCodeUtil = void 0;
var _reactNativeSvg = require("react-native-svg");
var _qrcode = _interopRequireDefault(require("qrcode"));
var _Colors = require("../constants/Colors");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CONNECTING_ERROR_MARGIN = 0.1;
const CIRCLE_SIZE_MODIFIER = 2.5;
const QRCODE_MATRIX_MARGIN = 7;
function isAdjecentDots(cy, otherCy, cellSize) {
  if (cy === otherCy) {
    return false;
  }
  const diff = cy - otherCy < 0 ? otherCy - cy : cy - otherCy;
  return diff <= cellSize + CONNECTING_ERROR_MARGIN;
}
function getMatrix(value, errorCorrectionLevel) {
  const arr = Array.prototype.slice.call(_qrcode.default.create(value, {
    errorCorrectionLevel
  }).modules.data, 0);
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce((rows, key, index) => (index % sqrt === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
}
const QRCodeUtil = {
  generate(uri, size, logoSize, theme) {
    const dotColor = theme === 'light' ? _Colors.DarkTheme.background1 : _Colors.LightTheme.background1;
    const edgeColor = theme === 'light' ? _Colors.LightTheme.background1 : _Colors.DarkTheme.background1;
    const dots = [];
    const matrix = getMatrix(uri, 'Q');
    const cellSize = size / matrix.length;
    const qrList = [{
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }];
    qrList.forEach(_ref => {
      let {
        x,
        y
      } = _ref;
      const x1 = (matrix.length - QRCODE_MATRIX_MARGIN) * cellSize * x;
      const y1 = (matrix.length - QRCODE_MATRIX_MARGIN) * cellSize * y;
      const borderRadius = 0.32;
      for (let i = 0; i < qrList.length; i += 1) {
        const dotSize = cellSize * (QRCODE_MATRIX_MARGIN - i * 2);
        dots.push( /*#__PURE__*/React.createElement(_reactNativeSvg.Rect, {
          key: `rect_${x1 + cellSize * i}_${y1 + cellSize * i}`,
          fill: i % 2 === 0 ? dotColor : edgeColor,
          height: dotSize,
          rx: dotSize * borderRadius,
          ry: dotSize * borderRadius,
          width: dotSize,
          x: x1 + cellSize * i,
          y: y1 + cellSize * i
        }));
      }
    });
    const clearArenaSize = Math.floor((logoSize + 25) / cellSize);
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;
    const circles = [];

    // Getting coordinates for each of the QR code dots
    matrix.forEach((row, i) => {
      row.forEach((_, j) => {
        if (matrix[i][j]) {
          if (!(i < QRCODE_MATRIX_MARGIN && j < QRCODE_MATRIX_MARGIN || i > matrix.length - (QRCODE_MATRIX_MARGIN + 1) && j < QRCODE_MATRIX_MARGIN || i < QRCODE_MATRIX_MARGIN && j > matrix.length - (QRCODE_MATRIX_MARGIN + 1))) {
            if (!(i > matrixMiddleStart && i < matrixMiddleEnd && j > matrixMiddleStart && j < matrixMiddleEnd)) {
              const cx = i * cellSize + cellSize / 2;
              const cy = j * cellSize + cellSize / 2;
              circles.push([cx, cy]);
            }
          }
        }
      });
    });

    // Cx to multiple cys
    const circlesToConnect = {};

    // Mapping all dots cicles on the same x axis
    circles.forEach(_ref2 => {
      let [cx, cy] = _ref2;
      if (circlesToConnect[cx]) {
        var _circlesToConnect$cx;
        (_circlesToConnect$cx = circlesToConnect[cx]) === null || _circlesToConnect$cx === void 0 ? void 0 : _circlesToConnect$cx.push(cy);
      } else {
        circlesToConnect[cx] = [cy];
      }
    });

    // Drawing lonely dots
    Object.entries(circlesToConnect)
    // Only get dots that have neighbors
    .map(_ref3 => {
      let [cx, cys] = _ref3;
      const newCys = cys.filter(cy => cys.every(otherCy => !isAdjecentDots(cy, otherCy, cellSize)));
      return [Number(cx), newCys];
    }).forEach(_ref4 => {
      let [cx, cys] = _ref4;
      cys.forEach(cy => {
        dots.push( /*#__PURE__*/React.createElement(_reactNativeSvg.Circle, {
          key: `circle_${cx}_${cy}`,
          cx: cx,
          cy: cy,
          fill: dotColor,
          r: cellSize / CIRCLE_SIZE_MODIFIER
        }));
      });
    });

    // Drawing lines for dots that are close to each other
    Object.entries(circlesToConnect)
    // Only get dots that have more than one dot on the x axis
    .filter(_ref5 => {
      let [_, cys] = _ref5;
      return cys.length > 1;
    })
    // Removing dots with no neighbors
    .map(_ref6 => {
      let [cx, cys] = _ref6;
      const newCys = cys.filter(cy => cys.some(otherCy => isAdjecentDots(cy, otherCy, cellSize)));
      return [Number(cx), newCys];
    })
    // Get the coordinates of the first and last dot of a line
    .map(_ref7 => {
      let [cx, cys] = _ref7;
      cys.sort((a, b) => a < b ? -1 : 1);
      const groups = [];
      for (const cy of cys) {
        const group = groups.find(item => item.some(otherCy => isAdjecentDots(cy, otherCy, cellSize)));
        if (group) {
          group.push(cy);
        } else {
          groups.push([cy]);
        }
      }
      return [cx, groups.map(item => [item[0], item[item.length - 1]])];
    }).forEach(_ref8 => {
      let [cx, groups] = _ref8;
      groups.forEach(_ref9 => {
        let [y1, y2] = _ref9;
        dots.push( /*#__PURE__*/React.createElement(_reactNativeSvg.Line, {
          key: `line_${cx}_${y1}_${y2}`,
          x1: cx,
          x2: cx,
          y1: y1,
          y2: y2,
          stroke: dotColor,
          strokeWidth: cellSize / (CIRCLE_SIZE_MODIFIER / 2),
          strokeLinecap: "round"
        }));
      });
    });
    return dots;
  }
};
exports.QRCodeUtil = QRCodeUtil;
//# sourceMappingURL=QRCodeUtil.js.map