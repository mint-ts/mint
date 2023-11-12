import { getReactiveValue } from "../../core";
import { HtmlElement, TextElement } from "../types";
import { isObjectOfType } from "../utils";
import { htmlElementToString } from "./htmlElementToString";

export const elToString = (el: HtmlElement | TextElement) => {
  if (isObjectOfType(el, "html")) {
    return htmlElementToString(el);
  } else {
    return getReactiveValue(el.data.text);
  }
};

export const elementsToString = (elements: (HtmlElement | TextElement)[]) => {
  return elements.map(elToString).join("");
};
