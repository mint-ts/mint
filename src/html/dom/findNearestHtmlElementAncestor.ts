import { MintElement } from "../../types";
import { HtmlElement, isHtmlElementOfType } from "../elements";

export const findNearestHtmlElementAncestor = (el: MintElement) => {
  let parent = el.parent;
  while (parent && isHtmlElementOfType(el, "html")) {
    parent = parent.parent;
  }
  return parent as HtmlElement;
};
