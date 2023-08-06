import { MintElement } from "../elements";

export interface IDomAPI<T = MintElement> {
  create(el: T): DOMNode[];
  getFirstMountedNode(el: T): DOMNode | undefined;
  getAllMountedNodes(el: T): DOMNode[];
  destroy(el: T): void;
}

export type DOMNode = HTMLElement | Text;
