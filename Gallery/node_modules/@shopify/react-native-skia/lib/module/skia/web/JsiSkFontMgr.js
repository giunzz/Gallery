import { HostObject, NotImplementedOnRNWeb } from "./Host";
export class JsiSkFontMgr extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "FontMgr");
  }
  dispose() {
    this.ref.delete();
  }
  countFamilies() {
    return this.ref.countFamilies();
  }
  getFamilyName(index) {
    return this.ref.getFamilyName(index);
  }
  matchFamilyStyle(_familyName, _fontStyle) {
    throw new NotImplementedOnRNWeb();
  }
}
//# sourceMappingURL=JsiSkFontMgr.js.map