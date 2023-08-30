import { MintDOMElement, MintElement } from "../../elements";

export const findNearestDOMElementAncestor = (el: MintElement) => {
  let parent = el.parent;
  while (parent && parent.type !== "dom") {
    parent = parent.parent;
  }
  return parent as MintDOMElement<HTMLElement>;
};
