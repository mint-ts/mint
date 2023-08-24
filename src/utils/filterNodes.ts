import { MintElement, MintReactiveElement, MintTextElement } from "../elements";
import { MintNode } from "../types";
import { isEmptyNode } from "./isEmptyNode";
import { isReactive } from "./isReactive";
import { isTextNode } from "./isTextNode";

/** From MintNodes to a flattened array of MintElements */
export const filterNodes = (...nodes: MintNode[]) => {
  const elements: MintElement[] = [];

  for (const node of nodes.flat(Infinity as 1)) {
    if (isEmptyNode(node)) continue;
    if (isTextNode(node)) {
      elements.push(new MintTextElement(String(node)));
    }
    //
    else if (isReactive(node)) {
      elements.push(new MintReactiveElement(node));
    }
    //
    else {
      elements.push(node as unknown as MintElement);
    }
  }

  return elements;
};
