"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDebounceCallback = useDebounceCallback;
var _react = require("react");
function useDebounceCallback(_ref) {
  let {
    callback,
    delay = 250
  } = _ref;
  const timeoutRef = (0, _react.useRef)(null);
  const callbackRef = (0, _react.useRef)(callback);
  (0, _react.useEffect)(() => {
    callbackRef.current = callback;
  }, [callback]);
  const debouncedCallback = (0, _react.useCallback)(args => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(args);
    }, delay);
  }, [delay]);
  (0, _react.useEffect)(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return debouncedCallback;
}
//# sourceMappingURL=useDebounceCallback.js.map