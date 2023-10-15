import { Reactive } from "../reactive";
import { createElementFactory } from "./createElementFactory";
import { RenderItemFn, createListElement } from "./elements";

/** Used for dynamic lists. */
export const map = <Item>(
  reactiveArray: Reactive<Item[]>,
  renderItem: RenderItemFn<Item>
) => {
  return createElementFactory(() =>
    createListElement(reactiveArray, renderItem)
  );
};
