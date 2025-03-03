import React, { type Ref } from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
import type { FontSource } from './dynamicLoading/types';
export declare const DEFAULT_ICON_SIZE = 12;
export declare const DEFAULT_ICON_COLOR = "black";
type ValueData = {
    uri: string;
    scale: number;
};
type GetImageSourceSyncIconFunc<GM> = (name: GM, size?: number, color?: TextStyle['color']) => ValueData | undefined;
type GetImageSourceIconFunc<GM> = (name: GM, size?: number, color?: TextStyle['color']) => Promise<ValueData | undefined>;
export type IconProps<T> = TextProps & {
    name: T;
    size?: number;
    color?: TextStyle['color'];
    innerRef?: Ref<Text>;
};
type IconComponent<GM extends Record<string, number>> = React.FC<TextProps & {
    name: keyof GM;
    size?: number;
    color?: TextStyle['color'];
    innerRef?: Ref<Text>;
} & React.RefAttributes<Text>> & {
    getImageSource: GetImageSourceIconFunc<keyof GM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof GM>;
};
export type CreateIconSetOptions = {
    postScriptName: string;
    fontFileName: string;
    fontSource?: FontSource;
    fontStyle?: TextProps['style'];
};
export declare function createIconSet<GM extends Record<string, number>>(glyphMap: GM, postScriptName: string, fontFileName: string, fontStyle?: TextProps['style']): IconComponent<GM>;
export declare function createIconSet<GM extends Record<string, number>>(glyphMap: GM, options: CreateIconSetOptions): IconComponent<GM>;
export {};
//# sourceMappingURL=create-icon-set.d.ts.map