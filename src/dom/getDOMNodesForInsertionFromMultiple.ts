import { MintElement } from "../elements";
import { getDOMNodesForInsertion } from "./getDOMNodesForInsertion";
import { DOMNode } from "./types";

export const getDOMNodesForInsertionFromMultiple = (...els: MintElement[]) => {
  return els
    .map((el) => getDOMNodesForInsertion(el))
    .flat(Infinity) as DOMNode[];
};
