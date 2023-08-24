import { htmlNodeToString } from "./htmlNodeToString";
import { HTMLNode } from "./types";

export const htmlNodesToString = (...nodes: HTMLNode[]): string => {
  return nodes.map((n) => htmlNodeToString(n)).join("");
};
