"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWalletConnectModal = useWalletConnectModal;
var _valtio = require("valtio");
var _ModalCtrl = require("../controllers/ModalCtrl");
var _ClientCtrl = require("../controllers/ClientCtrl");
var _AccountCtrl = require("../controllers/AccountCtrl");
function useWalletConnectModal() {
  const modalState = (0, _valtio.useSnapshot)(_ModalCtrl.ModalCtrl.state);
  const accountState = (0, _valtio.useSnapshot)(_AccountCtrl.AccountCtrl.state);
  const clientState = (0, _valtio.useSnapshot)(_ClientCtrl.ClientCtrl.state);
  return {
    isOpen: modalState.open,
    open: _ModalCtrl.ModalCtrl.open,
    close: _ModalCtrl.ModalCtrl.close,
    provider: clientState.initialized ? _ClientCtrl.ClientCtrl.provider() : undefined,
    isConnected: accountState.isConnected,
    address: accountState.address
  };
}
//# sourceMappingURL=useWalletConnectModal.js.map