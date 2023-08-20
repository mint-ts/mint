import { MintDOMElement } from "../../elements";

export const setStyleProp = (el: MintDOMElement, styleValue: any) => {
  if (el.type !== "dom" || !el.dom) return;
  for (const [key, value] of Object.entries(styleValue as any) as any) {
    let v = value;

    if (typeof v === "number") {
      v = `${v}px`;
    }
    el.dom.style[key] = v;
  }
};
