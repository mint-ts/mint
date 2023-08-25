import { getPatch } from "fast-array-diff";
import { MintListElement } from "../../../elements";
import { filterNodes } from "../../../utils";
import { create } from "../create";
import { destroy } from "../destroy";
import { insertChildElements } from "../insertChildElements";

export const patch = (el: MintListElement) => {
  const patchItems = getPatch(el.array.prevValue, el.array.value);

  for (const patchItem of patchItems) {
    switch (patchItem.type) {
      case "add": {
        const elements = filterNodes(
          ...patchItem.items.map((item) => el.render(item))
        );
        el.children = [
          ...el.children.slice(0, patchItem.newPos),
          ...elements,
          ...el.children.slice(patchItem.newPos),
        ];
        elements.forEach((child, i) => {
          child.parent = el;
          child.index = patchItem.newPos + i;
          create(child);
        });
        insertChildElements(el, elements);
        break;
      }
      case "remove": {
        for (
          let i = patchItem.newPos + (patchItem.items.length - 1);
          i >= patchItem.newPos;
          i--
        ) {
          const child = el.children[i];
          destroy(child);
        }
        el.children = [
          ...el.children.slice(0, patchItem.newPos),
          ...el.children.slice(patchItem.newPos + patchItem.items.length),
        ];
        break;
      }
    }
  }
};
