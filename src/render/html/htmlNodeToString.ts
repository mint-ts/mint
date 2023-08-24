import { domElementHTMLNodeToString } from "./dom";
import { htmlNodesToString } from "./htmlNodesToString";
import { HTMLNode } from "./types";

export const htmlNodeToString = (node: HTMLNode): string => {
  switch (node.type) {
    case "dom": {
      return domElementHTMLNodeToString(node);
    }
    case "show": {
      if (!node.isShown) return "";
      return htmlNodesToString(...node.children);
    }
    case "text": {
      return node.text;
    }
  }
};
