export class JsiSkPathFactory extends Host {
    Make(): JsiSkPath;
    MakeFromSVGString(str: any): JsiSkPath | null;
    MakeFromOp(one: any, two: any, op: any): JsiSkPath | null;
    MakeFromCmds(cmds: any): JsiSkPath | null;
    MakeFromText(_text: any, _x: any, _y: any, _font: any): void;
}
import { Host } from "./Host";
import { JsiSkPath } from "./JsiSkPath";
