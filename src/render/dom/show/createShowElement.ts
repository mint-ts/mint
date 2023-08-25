import { MintShowElement } from "../../../elements";
import { initElementsChildren } from "../../../utils";
import { createMultiple } from "../createMultiple";
import { destroy } from "../destroy";
import { insertChildElements } from "../insertChildElements";

export const createShowElement = (el: MintShowElement) => {
  const unsub = el.when.subscribe(() => {
    if (el.condition === el.prevCondition) return;

    initElementsChildren(el, ...el.children);
    el.notShownChildren.forEach((c) => destroy(c));
    createMultiple(...el.children);
    insertChildElements(el);
  });

  el.cleanups.add(unsub);

  return createMultiple(...el.children);
};
