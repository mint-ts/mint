import { isReactive } from "../../reactive";
import { MintNode } from "../../types";
import { createTextElement } from "../elements";
import { isTextNode } from "../isTextNode";

export const createElement = (node: MintNode) => {
  const nodeIsReactive = isReactive(node);
  if (isTextNode(node) || nodeIsReactive) {
    const text = nodeIsReactive ? node : String(node);
    return createTextElement(text);
  }
};
