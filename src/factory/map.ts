import { MintListElement } from "../elements";
import { MintNode, Reactive } from "../types";

/**
 * Used for creating dynamic lists from a Reactive Array
 * @returns MintListElement
 */
export const map = <Item>(
  reactiveArray: Reactive<Item[]>,
  render: (item: Item) => MintNode
) => {
  return new MintListElement(reactiveArray, render);
};
