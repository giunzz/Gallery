"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUniversalProvider = createUniversalProvider;
var _universalProvider = _interopRequireDefault(require("@walletconnect/universal-provider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function createUniversalProvider(_ref) {
  let {
    projectId,
    relayUrl,
    metadata
  } = _ref;
  return _universalProvider.default.init({
    logger: __DEV__ ? 'info' : undefined,
    relayUrl,
    projectId,
    metadata
  });
}
//# sourceMappingURL=ProviderUtil.js.map