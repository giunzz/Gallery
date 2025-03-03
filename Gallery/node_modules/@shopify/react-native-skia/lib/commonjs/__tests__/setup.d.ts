import type { SkSurface, SkImage } from "../skia/types";
export declare const E2E: boolean;
export declare const CI: boolean;
export declare const itFailsE2e: jest.It;
export declare const itRunsE2eOnly: jest.It;
export declare const itRunsNodeOnly: jest.It;
export declare const itRunsCIAndNodeOnly: jest.It;
export declare const docPath: (relPath: string) => string;
export declare const processResult: (surface: SkSurface, relPath: string, overwrite?: boolean) => number;
interface CheckImageOptions {
    maxPixelDiff?: number;
    threshold?: number;
    overwrite?: boolean;
    mute?: boolean;
    shouldFail?: boolean;
}
export declare const checkImage: (image: SkImage, relPath: string, opts?: CheckImageOptions) => number;
export {};
