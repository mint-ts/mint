import { MintElement } from "../../elements";
import { createComponentElement } from "../shared";
import { createMultiple } from "./createMultiple";
import { createDOMElement } from "./dom";
import { createListElement } from "./list";
import { createShowElement } from "./show";
import { HTMLNode, TextElementHTMLNode } from "./types";

export const create = (el: MintElement): HTMLNode[] => {
  switch (el.type) {
    case "dom": {
      return createDOMElement(el);
    }
    case "component": {
      createComponentElement(el);
      return createMultiple(...el.children);
    }
    case "provider": {
      return createMultiple(...el.children);
    }
    case "show": {
      return createShowElement(el);
    }
    case "list": {
      return createListElement(el);
    }
    case "text": {
      const node: TextElementHTMLNode = {
        type: "text",
        text: el.text,
      };
      el.htmlNode = node;
      return [node];
    }
    case "reactive": {
      const node: TextElementHTMLNode = {
        type: "text",
        text: el.reactive.value,
      };
      el.htmlNode = node;
      const unsub = el.reactive.subscribe(() => {
        if (el.htmlNode) {
          el.htmlNode.text = el.reactive.value;
        }
      });
      el.cleanups.add(unsub);
      return [node];
    }
    default:
      return [];
  }
};
