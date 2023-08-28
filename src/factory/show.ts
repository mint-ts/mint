import { MintElementValue } from "../elements";
import { MintNode, Reactive } from "../types";

/**
 * Used for conditional rendering of nodes
 * @returns MintShowElement
 * */
export const show = (when: Reactive, yes: MintNode, no?: MintNode) => {
  return new MintElementValue("show", {
    when,
    yes,
    no,
  });
};
