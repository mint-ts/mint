import { MintShowElement } from "../../../elements";
import { createMultiple } from "../createMultiple";
import { destroy } from "../destroy";
import { insertChildElements } from "../insertChildElements";

export const createShowElement = (el: MintShowElement) => {
  const unsub = el.when.subscribe(() => {
    const isShown = el.children[0].isInserted;
    if (!el.when.value && isShown) {
      el.children.forEach((c) => destroy(c));
    }
    if (el.when.value && !isShown) {
      createMultiple(...el.children);
      insertChildElements(el);
    }
  });

  el.cleanups.add(unsub);

  if (!el.when.value) return [];

  return createMultiple(...el.children);
};
