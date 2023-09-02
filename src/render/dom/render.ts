import { MintNode } from "../../types";
import { DOMRenderer } from "./DOMRenderer";

export const render = (node: MintNode, container: HTMLElement) => {
  return new DOMRenderer().render(node, container);
};
