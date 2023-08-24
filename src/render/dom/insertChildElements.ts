import { MintElement, MintParentElement } from "../../elements";
import { findNearestDOMElementAncestor } from "./findNearestDOMElementAncestor";
import { findNodeAfter } from "./findNodeAfter";
import { getDOMNodesForInsertionFromMultiple } from "./getDOMNodesForInsertionFromMultiple";
import { onInsertion } from "./onInsertion";

export const insertChildElements = (
  el: MintParentElement,
  childEls: MintElement[] = el.children
) => {
  const nearestDOMAncestor = findNearestDOMElementAncestor(el);
  if (!nearestDOMAncestor.isInserted || !nearestDOMAncestor.dom) return;

  const domNodes = getDOMNodesForInsertionFromMultiple(...childEls);
  const lastChildEl = childEls.at(-1);
  const nodeAfter = lastChildEl
    ? findNodeAfter(lastChildEl, nearestDOMAncestor)
    : undefined;

  for (const domNode of domNodes) {
    nearestDOMAncestor.dom.insertBefore(domNode, nodeAfter ?? null);
  }
  onInsertion(...childEls);
};
