import { MintElement, MintParentElement } from "../elements";

export const initElementsChildren = (
  el: MintParentElement,
  ...children: MintElement[]
) => {
  children.forEach((child, i) => {
    child.parent = el;
    child.index = i;
  });
};
