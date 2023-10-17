import { draw } from "../../canvas";
import { Core } from "../../core";
import { isReactive } from "../../reactive";
import { getReactiveValue } from "../../utils";
import { HtmlElement, HtmlSupportedElements } from "../elements";
import { getEventTypeFromPropKey } from "./getEventTypeFromPropKey";
import { isEventProp } from "./isEventProp";
import { DomNode } from "./types";

export const createHtmlElementToNode = (
  core: Core<HtmlSupportedElements, DomNode>
) => {
  const setAttributeOrProp = (el: HtmlElement, key: string, value: any) => {
    if (!el.domNode) return;
    if (key === "style") {
      for (const [key, styleValue] of Object.entries(value as any) as any) {
        let v = styleValue;

        if (typeof v === "number") {
          v = `${v}px`;
        }
        el.domNode.style[key] = v;
      }
    }
    //
    else if (PROP_MAP[key]) {
      (el.domNode as any)[key] = value;
    }
    //
    else if (el.isSvg) {
      el.domNode.setAttribute(key, value as any);
    }
    //
    else {
      (el.domNode as any)[key] = value;
    }
  };

  const htmlElementToNode = (el: HtmlElement) => {
    const dom = el.isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", el.tag)
      : document.createElement(el.tag);
    el.domNode = dom;

    if (el.tag === "canvas" && el.children.length > 0) {
      setTimeout(() => {
        draw(el.children, dom as HTMLCanvasElement, core);
      });
    }
    //
    else {
      dom.append(...core.createNodes(el.children, el));
    }

    for (const [key, value] of Object.entries(el.props)) {
      if (isEventProp(key)) {
        dom.addEventListener(getEventTypeFromPropKey(key), value as any);
      }
      if (isReactive(value)) {
        el.disposers.push(
          core.manager.subscribeConsumer(value, () => {
            setAttributeOrProp(el, key, getReactiveValue(value));
          })
        );
      }
      setAttributeOrProp(el, key, getReactiveValue(value));
    }

    return dom;
  };

  return htmlElementToNode;
};

const PROP_MAP: any = {
  checked: 1,
  selected: 1,
  type: 1,
  value: 1,
};
