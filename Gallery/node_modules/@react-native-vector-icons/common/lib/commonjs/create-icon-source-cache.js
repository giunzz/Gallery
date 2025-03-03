"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createIconSourceCache;
const TYPE_VALUE = 'value';
const TYPE_ERROR = 'error';
function createIconSourceCache() {
  const cache = new Map();
  const setValue = (key, value) => cache.set(key, {
    type: TYPE_VALUE,
    data: value
  });
  const setError = (key, error) => cache.set(key, {
    type: TYPE_ERROR,
    data: error
  });
  const has = key => cache.has(key);
  const get = key => {
    const value = cache.get(key);
    if (!value) {
      return undefined;
    }
    const {
      type,
      data
    } = value;
    if (type === TYPE_ERROR) {
      throw data;
    }
    return data;
  };
  return {
    setValue,
    setError,
    has,
    get
  };
}
//# sourceMappingURL=create-icon-source-cache.js.map