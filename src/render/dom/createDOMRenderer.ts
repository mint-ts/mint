import { MintTree } from "../../MintTree";
import { MintRenderer } from "../types";
import { createHTMLElementRenderer } from "./createHTMLElementRenderer";
import { createReactiveElementRenderer } from "./createReactiveElementRenderer";
import { createTextElementRenderer } from "./createTextElementRenderer";
import { findNearestDOMElementAncestor } from "./findNearestDOMElementAncestor";
import { findNodeAfter } from "./findNodeAfter";
import { DOMNode } from "./types";

export const createDOMRenderer = ({
  tree,
}: DOMRendererArgs): MintRenderer<DOMNode, HTMLElement> => {
  return {
    dom: createHTMLElementRenderer(),
    text: createTextElementRenderer(),
    reactive: createReactiveElementRenderer(),
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

export type DOMRendererArgs = {
  tree: MintTree;
};
