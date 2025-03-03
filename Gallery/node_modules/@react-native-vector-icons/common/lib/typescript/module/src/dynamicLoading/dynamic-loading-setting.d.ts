import type { FontSource } from './types';
declare global {
    interface ExpoGlobal {
        modules: {
            ExpoAsset: {
                downloadAsync: (uri: string, hash: string | undefined, type: string) => Promise<string>;
            };
            ExpoFontLoader: {
                getLoadedFonts: () => string[];
                loadAsync: (fontFamilyAlias: string, fileUri: string) => Promise<void>;
            };
        };
    }
    var expo: ExpoGlobal | undefined;
}
export declare const isDynamicLoadingSupported: () => boolean;
/**
 * Set whether dynamic loading of fonts is enabled.
 * Currently, the presence of Expo Asset and Font Loader modules is a prerequisite for enabling.
 * In the future, React Native core apis will be used for dynamic font loading.
 *
 * @param value - whether dynamic loading of fonts is enabled
 * @returns `true` if dynamic loading of fonts was successfully set. `false` otherwise.
 * */
export declare const setDynamicLoadingEnabled: (value: boolean) => boolean;
/**
 * Whether dynamic loading of fonts is enabled.
 * */
export declare const isDynamicLoadingEnabled: () => boolean;
type ErrorCallback = (args: {
    error: Error;
    fontFamily: string;
    fontSource: FontSource;
}) => void;
/**
 * Set a callback to be called when an error occurs during dynamic font loading.
 * */
export declare const setDynamicLoadingErrorCallback: (callback: ErrorCallback) => void;
export declare const getErrorCallback: () => ErrorCallback | undefined;
export {};
//# sourceMappingURL=dynamic-loading-setting.d.ts.map