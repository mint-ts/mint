import { MintShowElement } from "../../../elements";
import { createMultiple } from "../createMultiple";
import { destroyMultiple } from "../destroyMultiple";
import { HTMLNode, ShowElementHTMLNode } from "../types";

export const createShowElement = (el: MintShowElement): HTMLNode[] => {
  const node: ShowElementHTMLNode = {
    type: "show",
    isShown: !!el.when.value,
    children: createMultiple(...el.children),
  };
  el.htmlNode = node;

  const unsub = el.when.subscribe(() => {
    if (!el.htmlNode) return;
    const isShown = el.children[0].isInserted;
    if (!el.when.value && isShown) {
      el.htmlNode.isShown = false;
      destroyMultiple(...el.children);
    }
    if (el.when.value && !isShown) {
      el.htmlNode.isShown = true;
    }
  });

  el.cleanups.add(unsub);

  return [node];
};
