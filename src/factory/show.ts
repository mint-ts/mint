import { MintElementValue, MintShowElement } from "../elements";
import { MintNode, Reactive } from "../types";

/**
 * Used for conditional rendering of nodes
 * @returns MintShowElement
 * */
export const show = (
  when: Reactive,
  yes: MintNode,
  no?: MintNode
): MintElementValue => {
  return new MintElementValue((renderer) => {
    return new MintShowElement(
      when,
      renderer.nodesToElements(yes),
      renderer.nodesToElements(no),
      renderer
    );
  });
};
