import { MintDOMElement } from "../../elements";
import { getReactiveValue, isReactive } from "../../utils";
import { create } from "../create";
import { getEventTypeFromPropKey } from "./getEventTypeFromPropKey";
import { isEventProp } from "./isEventProp";
import { setStyleProp } from "./setStyleProp";

export const createDOMElement = (el: MintDOMElement) => {
  const dom = document.createElement(el.tag);
  el.dom = dom;

  for (const child of el.children) {
    dom.append(...create(child));
  }

  for (const [key, value] of Object.entries(el.props)) {
    if (isEventProp(key)) {
      dom.addEventListener(getEventTypeFromPropKey(key), value as any);
    }
    //
    else if (key === "style") {
      setStyleProp(el, getReactiveValue(value));
    }
    //
    else {
      (dom as any)[key] = getReactiveValue(value);
      if (isReactive(value)) {
        const unsub = value.subscribe(() => {
          (dom as any)[key] = value.value;
        });
        el.cleanups.add(unsub);
      }
    }
  }

  return [dom];
};
