import { MintDOMElement, MintElement } from "../elements";
import { getFirstInsertedDOMNodeFromMultiple } from "./getFirstInsertedDOMNodeFromMultiple";

export const findNodeAfter = (
  el: MintElement,
  nearestDOMAncestor: MintDOMElement
) => {
  let parent = el.parent;
  let index = el.index + 1;
  while (parent) {
    const first = getFirstInsertedDOMNodeFromMultiple(
      ...parent.children.slice(index)
    );
    if (first) {
      return first;
    }
    if (parent === nearestDOMAncestor) return;
    index = parent.index + 1;
    parent = parent.parent;
  }
};
