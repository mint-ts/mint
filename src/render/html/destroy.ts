import { MintElement } from "../../elements";
import { destroyComponentElement } from "../shared";
import { destroyMultiple } from "./destroyMultiple";

export const destroy = (el: MintElement) => {
  switch (el.type) {
    case "dom":
    case "provider":
    case "show": {
      destroyMultiple(...el.children);
      break;
    }
    case "component": {
      destroyMultiple(...el.children);
      destroyComponentElement(el);
    }
  }
  el.cleanups.forEach((f) => f());
};
