export declare function useWalletConnectModal(): {
    isOpen: boolean;
    open: (options?: import("../controllers/ModalCtrl").OpenOptions | undefined) => Promise<void>;
    close: () => void;
    provider: import("@walletconnect/universal-provider").IUniversalProvider | undefined;
    isConnected: boolean;
    address: string | undefined;
};
//# sourceMappingURL=useWalletConnectModal.d.ts.map