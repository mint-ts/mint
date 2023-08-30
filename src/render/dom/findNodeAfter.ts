import { MintDOMElement, MintElement } from "../../elements";

export const findNodeAfter = (
  el: MintElement,
  nearestDOMAncestor: MintDOMElement
) => {
  let parent = el.parent;
  let index = el.index + 1;
  while (parent) {
    const first = el.tree.getNodes(...parent.children.slice(index))[0];
    if (first) {
      return first;
    }
    if (parent === nearestDOMAncestor) return;
    index = parent.index + 1;
    parent = parent.parent;
  }
};
