import { Core, MintElementCoreWorksWith, MintShowElement } from "../../core";
import { MintRenderer } from "../../types";
import { HtmlSupportedElements, isHtmlElementOfType } from "../elements";
import { createElement } from "../shared";
import { findNearestHtmlElementAncestor } from "./findNearestHtmlElementAncestor";
import { createHtmlElementToNode } from "./htmlElementToNode";
import { createPatchList } from "./patchList";
import { createTextElementToNode } from "./textElementToNode";
import { DomNode } from "./types";

export const createDomRenderer = (
  core: Core<HtmlSupportedElements, DomNode>
): MintRenderer<HtmlSupportedElements, DomNode> => {
  const htmlElementToNode = createHtmlElementToNode(core);
  const textElementToNode = createTextElementToNode(core);

  const createNode = (el: HtmlSupportedElements): DomNode => {
    if (isHtmlElementOfType(el, "html")) {
      return htmlElementToNode(el);
    } else if (isHtmlElementOfType(el, "text")) {
      return textElementToNode(el);
    }
    return {} as any;
  };

  const destroyNode = (el: HtmlSupportedElements) => {
    if (el.domNode) {
      el.domNode.remove();
      el.domNode = undefined;
    }
    el.dispose?.();
    if (isHtmlElementOfType(el, "html")) {
      core.destroyNodes(el.children);
    }
  };

  const findFirstDomNodeAfter = (
    el: MintElementCoreWorksWith<HtmlSupportedElements>,
    nearestDOMAncestor: HtmlSupportedElements
  ) => {
    let parent = el.parent;
    let index = el.index + 1;
    while (parent) {
      const first = core.getFirstNode(parent.children.slice(index));
      if (first) return first;
      if (parent === nearestDOMAncestor) return;
      index = parent.index + 1;
      parent = parent.parent;
    }
  };

  const insertShowNodes = (
    el: MintShowElement,
    els: MintElementCoreWorksWith<HtmlSupportedElements>[]
  ) => {
    if (els.length === 0) return;
    const htmlAncestor = findNearestHtmlElementAncestor(el);
    const ancestorNode = htmlAncestor.domNode;
    if (ancestorNode) {
      const domNodes = core.createNodes(els, el);
      const nodeAfter = findFirstDomNodeAfter(els.at(-1)!, htmlAncestor);
      for (const domNode of domNodes) {
        ancestorNode.insertBefore(domNode, nodeAfter ?? null);
      }
    }
  };

  const patchList = createPatchList(core);

  return {
    createElement,
    getNode: (el) => {
      return el.domNode;
    },
    createNode,
    destroyNode,
    insertShowNodes,
    flushUpdates: (fns) => {
      requestAnimationFrame(() => fns.forEach((fn) => fn()));
    },
    patchList,
  };
};
