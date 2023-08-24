import { MintParentElement } from "../elements";

export const initElementsChildren = (el: MintParentElement) => {
  el.children.forEach((child, i) => {
    child.parent = el;
    child.index = i;
  });
};
