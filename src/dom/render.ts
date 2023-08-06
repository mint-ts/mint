import { MintNode } from "../types";
import { DomAPI } from "./DomAPI";

/** Creates DOM nodes from a MintNode and inserts them into the container element */
export const render = (node: MintNode, container: HTMLElement) => {
  const domAPI = new DomAPI();

  domAPI.render(node, container);
};
