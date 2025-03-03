declare const TYPE_VALUE = "value";
declare const TYPE_ERROR = "error";
type ValueData = {
    uri: string;
    scale: number;
};
type Value = {
    type: typeof TYPE_VALUE;
    data: ValueData;
} | {
    type: typeof TYPE_ERROR;
    data: Error;
};
export default function createIconSourceCache(): {
    setValue: (key: string, value: ValueData) => Map<string, Value>;
    setError: (key: string, error: Error) => Map<string, Value>;
    has: (key: string) => boolean;
    get: (key: string) => ValueData | undefined;
};
export {};
//# sourceMappingURL=create-icon-source-cache.d.ts.map