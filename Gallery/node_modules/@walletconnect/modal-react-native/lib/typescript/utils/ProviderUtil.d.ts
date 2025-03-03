import UniversalProvider from '@walletconnect/universal-provider';
import type { IProviderMetadata } from '../types/coreTypes';
export declare function createUniversalProvider({ projectId, relayUrl, metadata, }: {
    projectId: string;
    metadata: IProviderMetadata;
    relayUrl?: string;
}): Promise<UniversalProvider>;
//# sourceMappingURL=ProviderUtil.d.ts.map