import { MintListElement } from "../../../elements";
import { filterNodes } from "../../../utils";
import { createMultiple } from "../createMultiple";
import { patch } from "./patch";

export const createListElement = (el: MintListElement) => {
  const elements = filterNodes(...el.array.value.map(el.render));

  elements.forEach((child, i) => {
    child.parent = el;
    child.index = i;
  });

  el.children = elements;

  const unsub = el.array.subscribe(() => {
    patch(el);
  });

  el.cleanups.add(unsub);

  return createMultiple(...el.children);
};
