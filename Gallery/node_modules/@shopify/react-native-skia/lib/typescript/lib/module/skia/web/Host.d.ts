export class NotImplementedOnRNWeb extends Error {
    constructor(msg: any);
}
export class Host {
    constructor(CanvasKit: any);
    CanvasKit: any;
}
export class BaseHostObject extends Host {
    constructor(CanvasKit: any, ref: any, typename: any);
    ref: any;
    __typename__: any;
}
export class HostObject extends BaseHostObject {
    static fromValue(value: any): any;
}
export function getEnum(e: any, v: any): any;
export function optEnum(e: any, value: any): any;
