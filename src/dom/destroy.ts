import { MintElement } from "../elements";
import { destroyComponentElement } from "./component";
import { destroyMultiple } from "./destroyMultiple";
import { destroyDOMElement } from "./dom";
import { destroyReactiveElement } from "./reactive";
import { destroyTextElement } from "./text";

export const destroy = (el: MintElement) => {
  switch (el.type) {
    case "dom": {
      destroyDOMElement(el);
      break;
    }
    case "component": {
      destroyComponentElement(el);
      break;
    }
    case "list":
    case "show":
    case "provider": {
      destroyMultiple(...el.children);
      break;
    }
    case "text": {
      destroyTextElement(el);
      break;
    }
    case "reactive": {
      destroyReactiveElement(el);
      break;
    }
  }
  el.cleanups.forEach((f) => f());
  el.isInserted = false;
};
