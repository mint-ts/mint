import { MintElement } from "../../elements";
import { createComponentElement } from "../shared";
import { createMultiple } from "./createMultiple";
import { createDOMElement } from "./dom";
import { createListElement } from "./list";
import { createReactiveElement } from "./reactive";
import { createShowElement } from "./show";
import { createTextElement } from "./text";
import { DOMNode } from "./types";

export const create = (el: MintElement): DOMNode[] => {
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
    case "list": {
      return createListElement(el);
    }
    case "show": {
      return createShowElement(el);
    }
    case "text": {
      return createTextElement(el);
    }
    case "reactive": {
      return createReactiveElement(el);
    }
    default:
      return [];
  }
};
