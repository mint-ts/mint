import { MintTree } from "../../MintTree";
import { MintDOMElement, MintElement } from "../../elements";
import { MintRenderer } from "../types";
import { createShowElementRenderer } from "./createShowElementRenderer";
import { createHTMLElementRenderer } from "./html";
import { createReactiveElementRenderer } from "./reactive";
import { createTextElementRenderer } from "./text";
import { DOMNode } from "./types";

export const createDOMRenderer = ({
  tree,
}: DOMRendererArgs): MintRenderer<DOMNode, HTMLElement> => {
  return {
    dom: createHTMLElementRenderer(),
    text: createTextElementRenderer(),
    reactive: createReactiveElementRenderer(),
    show: createShowElementRenderer(tree),
    insertElements(parent, elements) {
      const nearestDOMAncestor = findNearestDOMElementAncestor(parent);
      if (!nearestDOMAncestor.node) return;

      const domNodes = tree.getNodes(...elements);

      const lastChildEl = elements.at(-1);
      const nodeAfter = lastChildEl
        ? findNodeAfter(lastChildEl, nearestDOMAncestor)
        : undefined;

      for (const domNode of domNodes) {
        nearestDOMAncestor.node.insertBefore(domNode, nodeAfter ?? null);
      }
      // this.onInsertion(...childEls);
    },
    render: (nodes, container) => {
      container.append(...nodes);
    },
  };
};

const findNearestDOMElementAncestor = (el: MintElement) => {
  let parent = el.parent;
  while (parent && parent.type !== "dom") {
    parent = parent.parent;
  }
  return parent as MintDOMElement<HTMLElement>;
};

const findNodeAfter = (el: MintElement, nearestDOMAncestor: MintDOMElement) => {
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

export type DOMRendererArgs = {
  tree: MintTree;
};
