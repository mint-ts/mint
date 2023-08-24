import { MintElement } from "../../elements";
import { getDOMNodesForInsertionFromMultiple } from "./getDOMNodesForInsertionFromMultiple";
import { DOMNode } from "./types";

export const getDOMNodesForInsertion = (el: MintElement): DOMNode[] => {
  switch (el.type) {
    case "component":
    case "provider":
    case "list":
    case "show": {
      return getDOMNodesForInsertionFromMultiple(...el.children);
    }
    case "dom":
    case "text":
    case "reactive": {
      if (el.dom) {
        return [el.dom];
      }
      return [];
    }
    default:
      return [];
  }
};
