import { MintListElement } from "../../../elements";
import { filterNodes, initElementsChildren } from "../../../utils";
import { createMultiple } from "../createMultiple";
import { patch } from "./patch";

export const createListElement = (el: MintListElement) => {
  const elements = filterNodes(...el.array.value.map(el.render));

  initElementsChildren(el, ...elements);

  el.children = elements;

  const unsub = el.array.subscribe(() => {
    patch(el);
  });

  el.cleanups.add(unsub);

  return createMultiple(...el.children);
};
