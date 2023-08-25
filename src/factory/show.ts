import { MintShowElement } from "../elements";
import { MintNode, Reactive } from "../types";
import { filterNodes } from "../utils";

/**
 * Used for conditional rendering of nodes
 * @returns MintShowElement
 * */
export const show = (when: Reactive, yes: MintNode, no?: MintNode) => {
  return new MintShowElement(when, filterNodes(yes), filterNodes(no));
};
