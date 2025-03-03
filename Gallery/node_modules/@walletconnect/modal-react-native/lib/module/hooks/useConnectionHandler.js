import { useCallback, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { AccountCtrl } from '../controllers/AccountCtrl';
import { WcConnectionCtrl } from '../controllers/WcConnectionCtrl';
import { ClientCtrl } from '../controllers/ClientCtrl';
import { defaultSessionParams } from '../constants/Config';
import { ConfigCtrl } from '../controllers/ConfigCtrl';
import { StorageUtil } from '../utils/StorageUtil';
import { ModalCtrl } from '../controllers/ModalCtrl';
import { RouterCtrl } from '../controllers/RouterCtrl';
const FOUR_MIN_MS = 240000;
export function useConnectionHandler() {
  const timeoutRef = useRef(null);
  const {
    isConnected
  } = useSnapshot(AccountCtrl.state);
  const {
    pairingEnabled,
    pairingUri
  } = useSnapshot(WcConnectionCtrl.state);
  const {
    provider
  } = useSnapshot(ClientCtrl.state);
  const {
    sessionParams
  } = useSnapshot(ConfigCtrl.state);
  const onSessionCreated = async session => {
    WcConnectionCtrl.setPairingError(false);
    WcConnectionCtrl.setPairingEnabled(false);
    ClientCtrl.setSessionTopic(session.topic);
    const clearDeepLink = RouterCtrl.state.view === 'Qrcode';
    try {
      if (clearDeepLink) {
        await StorageUtil.removeDeepLinkWallet();
      }
      AccountCtrl.getAccount();
      ModalCtrl.close();
    } catch (error) {}
  };
  const connectAndWait = useCallback(async () => {
    try {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (!isConnected && pairingEnabled) {
        timeoutRef.current = setTimeout(connectAndWait, FOUR_MIN_MS);
        const session = await provider.connect(sessionParams ?? defaultSessionParams);
        if (session) {
          onSessionCreated(session);
        }
      }
    } catch (error) {
      WcConnectionCtrl.setPairingUri('');
      WcConnectionCtrl.setPairingError(true);
    }
  }, [isConnected, provider, sessionParams, pairingEnabled]);
  useEffect(() => {
    if (provider && !isConnected && pairingEnabled && !pairingUri) {
      connectAndWait();
    }
  }, [provider, connectAndWait, isConnected, pairingEnabled, pairingUri]);
  return null;
}
//# sourceMappingURL=useConnectionHandler.js.map