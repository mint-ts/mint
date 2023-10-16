import { Core } from "../../core";
import { isReactive } from "../../reactive";
import { getReactiveValue } from "../../utils";
import { HtmlSupportedElements, TextElement } from "../elements";
import { DomNode } from "./types";

export const createTextElementToNode = (
  core: Core<HtmlSupportedElements, DomNode>
) => {
  const textElementToNode = (el: TextElement) => {
    if (isReactive(el.text)) {
      el.dispose = core.manager.subscribeConsumer(el.text, () => {
        if (!el.domNode) return;
        el.domNode.textContent = getReactiveValue(el.text);
      });
    }
    const txt = document.createTextNode(getReactiveValue(el.text));
    el.domNode = txt;
    return txt;
  };
  return textElementToNode;
};
