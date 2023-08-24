import { MintNode } from "../../types";
import { filterNodes } from "../../utils";
import { createMultiple } from "./createMultiple";
import { domElementHTMLNodeToString } from "./dom/domElementHTMLNodeToString";
import { DOMElementHTMLNode } from "./types";

/** Creates an HTML string from a MintNode and returns it */
export const renderHTML = (node: MintNode) => {
  const elements = filterNodes(node);
  const nodes = createMultiple(...elements);

  return domElementHTMLNodeToString(nodes[0] as DOMElementHTMLNode);
};
