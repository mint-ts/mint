import { MintDOMElement } from "../../../elements";
import { destroyMultiple } from "../destroyMultiple";

export const destroyDOMElement = (el: MintDOMElement) => {
  destroyMultiple(...el.children);
  if (el.dom) {
    el.dom.remove();
    el.dom = undefined;
  }
};
