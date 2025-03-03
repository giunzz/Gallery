"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optEnum = exports.getEnum = exports.NotImplementedOnRNWeb = exports.HostObject = exports.Host = exports.BaseHostObject = void 0;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class NotImplementedOnRNWeb extends Error {
  constructor(msg) {
    super(msg !== null && msg !== void 0 ? msg : "Not implemented on React Native Web");
  }
}
exports.NotImplementedOnRNWeb = NotImplementedOnRNWeb;
class Host {
  constructor(CanvasKit) {
    _defineProperty(this, "CanvasKit", void 0);
    this.CanvasKit = CanvasKit;
  }
}
exports.Host = Host;
class BaseHostObject extends Host {
  constructor(CanvasKit, ref, typename) {
    super(CanvasKit);
    _defineProperty(this, "__typename__", void 0);
    _defineProperty(this, "ref", void 0);
    this.ref = ref;
    this.__typename__ = typename;
  }
}
exports.BaseHostObject = BaseHostObject;
class HostObject extends BaseHostObject {
  static fromValue(value) {
    return value.ref;
  }
}
exports.HostObject = HostObject;
const getEnum = (e, v) => Object.values(e).find(({
  value
}) => value === v);
exports.getEnum = getEnum;
const optEnum = (e, value) => value === undefined ? undefined : getEnum(e, value);
exports.optEnum = optEnum;
//# sourceMappingURL=Host.js.map