import { MintElementValue } from "../elements";
import { MintNode, Reactive } from "../types";

/**
 * Used for creating dynamic lists from a Reactive Array
 * @returns MintListElement
 */
export const map = <Item>(
  reactiveArray: Reactive<Item[]>,
  render: (item: Item) => MintNode
) => {
  return new MintElementValue("list", { array: reactiveArray, render });
};
