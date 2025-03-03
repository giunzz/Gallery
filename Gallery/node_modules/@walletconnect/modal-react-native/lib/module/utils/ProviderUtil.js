import UniversalProvider from '@walletconnect/universal-provider';
export async function createUniversalProvider(_ref) {
  let {
    projectId,
    relayUrl,
    metadata
  } = _ref;
  return UniversalProvider.init({
    logger: __DEV__ ? 'info' : undefined,
    relayUrl,
    projectId,
    metadata
  });
}
//# sourceMappingURL=ProviderUtil.js.map