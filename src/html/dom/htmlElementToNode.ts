import { DomNode } from ".";
import { Core } from "../../core";
import { HtmlElement, HtmlSupportedElements } from "../elements";
import { getEventTypeFromPropKey } from "./getEventTypeFromPropKey";
import { isEventProp } from "./isEventProp";

export const createHtmlElementToNode = (
  core: Core<HtmlSupportedElements, DomNode>
) => {
  const htmlElementToNode = (el: HtmlElement) => {
    const dom = el.isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", el.tag)
      : document.createElement(el.tag);
    el.domNode = dom;

    if (el.tag !== "canvas") {
      dom.append(...core.createNodes(el.children, el));
    }

    for (const [key, value] of Object.entries(el.props)) {
      if (isEventProp(key)) {
        dom.addEventListener(getEventTypeFromPropKey(key), value as any);
      }
      //
      else if (key === "style") {
        for (const [key, styleValue] of Object.entries(value as any) as any) {
          let v = styleValue;

          if (typeof v === "number") {
            v = `${v}px`;
          }
          el.domNode.style[key] = v;
        }
      }
      //
      else if (key === "type") {
        (el.domNode as any)[key] = value;
      }
      //
      else if (key === "checked") {
        (el.domNode as any)[key] = value;
      }
      //
      else {
        if (el.isSvg) {
          el.domNode.setAttribute(key, value as any);
        }
        //
        else {
          (el.domNode as any)[key] = value;
        }
      }
    }

    return dom;
  };

  return htmlElementToNode;
};
