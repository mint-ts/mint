import { MintElement } from "../elements";
import { getFirstInsertedDOMNode } from "./getFirstInsertedDOMNode";

export const getFirstInsertedDOMNodeFromMultiple = (...els: MintElement[]) => {
  for (const el of els) {
    const dom = getFirstInsertedDOMNode(el);
    if (dom) {
      return dom;
    }
  }
};
