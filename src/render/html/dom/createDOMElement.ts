import { MintDOMElement } from "../../../elements";
import { isEventProp } from "../../shared";
import { createMultiple } from "../createMultiple";
import { HTMLNode } from "../types";
import { getStyleStringFromStyleObject } from "./getStyleStringFromStyleObject";

export const createDOMElement = (el: MintDOMElement): HTMLNode[] => {
  let props: Record<string, string> = {};

  for (const [key, value] of Object.entries(el.props)) {
    if (isEventProp(key)) continue;
    else if (key === "style") {
      props.style = getStyleStringFromStyleObject(value);
    }
    //
    else {
      props[key] = String(value);
    }
  }

  return [
    {
      type: "dom",
      tag: el.tag,
      props,
      children: createMultiple(...el.children),
    },
  ];
};
