import { MintElement } from "../../elements";
import { getFirstInsertedDOMNodeFromMultiple } from "./getFirstInsertedDOMNodeFromMultiple";
import { DOMNode } from "./types";

export const getFirstInsertedDOMNode = (
  el: MintElement
): DOMNode | undefined => {
  switch (el.type) {
    case "component":
    case "provider":
    case "list":
    case "show": {
      return getFirstInsertedDOMNodeFromMultiple(...el.children);
    }
    case "dom":
    case "text":
    case "reactive": {
      if (el.dom && el.isInserted) {
        return el.dom;
      }
      return;
    }
    default:
      return;
  }
};
