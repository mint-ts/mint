import { MintElement } from "../elements";
import { MintNode, Reactive } from "../types";
import { filterNodes } from "../utils";

/** Used for conditional rendering of nodes */
export const show = (when: Reactive, ...nodes: MintNode[]) => {
  return new MintElement({
    type: "show",
    data: {
      reactive: when,
      children: filterNodes(...nodes),
    },
  });
};
