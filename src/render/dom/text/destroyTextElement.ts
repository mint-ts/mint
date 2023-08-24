import { MintTextElement } from "../../../elements";

export const destroyTextElement = (el: MintTextElement) => {
  if (el.dom) {
    el.dom.remove();
    el.dom = undefined;
  }
};
