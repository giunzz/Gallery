"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConnectionHandler = useConnectionHandler;
var _react = require("react");
var _valtio = require("valtio");
var _AccountCtrl = require("../controllers/AccountCtrl");
var _WcConnectionCtrl = require("../controllers/WcConnectionCtrl");
var _ClientCtrl = require("../controllers/ClientCtrl");
var _Config = require("../constants/Config");
var _ConfigCtrl = require("../controllers/ConfigCtrl");
var _StorageUtil = require("../utils/StorageUtil");
var _ModalCtrl = require("../controllers/ModalCtrl");
var _RouterCtrl = require("../controllers/RouterCtrl");
const FOUR_MIN_MS = 240000;
function useConnectionHandler() {
  const timeoutRef = (0, _react.useRef)(null);
  const {
    isConnected
  } = (0, _valtio.useSnapshot)(_AccountCtrl.AccountCtrl.state);
  const {
    pairingEnabled,
    pairingUri
  } = (0, _valtio.useSnapshot)(_WcConnectionCtrl.WcConnectionCtrl.state);
  const {
    provider
  } = (0, _valtio.useSnapshot)(_ClientCtrl.ClientCtrl.state);
  const {
    sessionParams
  } = (0, _valtio.useSnapshot)(_ConfigCtrl.ConfigCtrl.state);
  const onSessionCreated = async session => {
    _WcConnectionCtrl.WcConnectionCtrl.setPairingError(false);
    _WcConnectionCtrl.WcConnectionCtrl.setPairingEnabled(false);
    _ClientCtrl.ClientCtrl.setSessionTopic(session.topic);
    const clearDeepLink = _RouterCtrl.RouterCtrl.state.view === 'Qrcode';
    try {
      if (clearDeepLink) {
        await _StorageUtil.StorageUtil.removeDeepLinkWallet();
      }
      _AccountCtrl.AccountCtrl.getAccount();
      _ModalCtrl.ModalCtrl.close();
    } catch (error) {}
  };
  const connectAndWait = (0, _react.useCallback)(async () => {
    try {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (!isConnected && pairingEnabled) {
        timeoutRef.current = setTimeout(connectAndWait, FOUR_MIN_MS);
        const session = await provider.connect(sessionParams ?? _Config.defaultSessionParams);
        if (session) {
          onSessionCreated(session);
        }
      }
    } catch (error) {
      _WcConnectionCtrl.WcConnectionCtrl.setPairingUri('');
      _WcConnectionCtrl.WcConnectionCtrl.setPairingError(true);
    }
  }, [isConnected, provider, sessionParams, pairingEnabled]);
  (0, _react.useEffect)(() => {
    if (provider && !isConnected && pairingEnabled && !pairingUri) {
      connectAndWait();
    }
  }, [provider, connectAndWait, isConnected, pairingEnabled, pairingUri]);
  return null;
}
//# sourceMappingURL=useConnectionHandler.js.map