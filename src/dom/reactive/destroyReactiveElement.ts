import { MintReactiveElement } from "../../elements";

export const destroyReactiveElement = (el: MintReactiveElement) => {
  if (el.dom) {
    el.dom.remove();
    el.dom = undefined;
  }
};
