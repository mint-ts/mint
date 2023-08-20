import { DOMNode } from "./types";

export const isDOMNodeInserted = (node?: DOMNode): node is DOMNode => {
  return !!node && document.body.contains(node);
};
