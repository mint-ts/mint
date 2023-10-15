import { htmlNodeToString } from "./htmlNodeToString";
import { HtmlNode } from "./types";

export const htmlNodesToString = (nodes: HtmlNode[]) => {
  return nodes
    .map((n) => htmlNodeToString(n))
    .flat(Infinity)
    .join("");
};
