import { Core } from "../../core";
import { MintRenderer } from "../../types";
import { getReactiveValue } from "../../utils";
import { HtmlSupportedElements, isHtmlElementOfType } from "../elements";
import { createElement } from "../shared";
import { HtmlElementNode, HtmlNode, TextElementHtmlNode } from "./types";

export const createHtmlRenderer = (
  core: Core<HtmlSupportedElements, HtmlNode>
): MintRenderer<HtmlSupportedElements, HtmlNode> => {
  const createNode = (el: HtmlSupportedElements) => {
    if (isHtmlElementOfType(el, "html")) {
      const node: HtmlElementNode = {
        type: "html",
        tag: el.tag,
        props: el.props,
        children: core.createNodes(el.children, el),
      };
      el.htmlNode = node;
      return node;
    } else if (isHtmlElementOfType(el, "text")) {
      const node: TextElementHtmlNode = {
        type: "text",
        text: getReactiveValue(el.text),
      };
      el.htmlNode = node;
      return node;
    }
    return {} as any;
  };

  return {
    createElement,
    getNode: (el) => {
      return el.htmlNode;
    },
    createNode,
    destroyNode: (el) => {
      el;
    },
    insertShowNodes: (el, els) => {
      el;
      els;
    },
    patchList: (el) => {
      el;
    },
  };
};
