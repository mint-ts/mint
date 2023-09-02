import { MintElementValue, MintListElement } from "../elements";
import { MintNode, Reactive } from "../types";

/**
 * Used for creating dynamic lists from a Reactive Array
 * @returns MintListElement
 */
export const map = <Item>(
  reactiveArray: Reactive<Item[]>,
  render: (item: Item) => MintNode
): MintElementValue => {
  return new MintElementValue(
    (renderer) => new MintListElement(reactiveArray, render, renderer)
  );
};
