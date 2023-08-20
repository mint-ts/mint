import { MintElement } from "../elements";

export interface IDomAPI<T = MintElement> {
  create(el: T): DOMNode[];
  getFirstInsertedDOMNode(el: T): DOMNode | undefined;
  getDOMNodesForInsertion(el: T): DOMNode[];
  destroy(el: T): void;
}

export type DOMNode = HTMLElement | Text;
