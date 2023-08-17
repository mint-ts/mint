import { MintElement } from "../elements";
import { MintNode, Reactive } from "../types";

/** Used for creating dynamic lists from a Reactive Array */
export const map = <Item>(
  reactiveArray: Reactive<Item[]>,
  render: (item: Item) => MintNode
) => {
  return new MintElement({
    type: "list",
    data: {
      reactiveArray,
      render,
      children: [],
    },
  });
};
