import { MintElement } from "./elements";
import { Computed, State } from "./reactive";
import { MintEmptyNode, MintNode, MintTextNode, Reactive } from "./types";

export const isTextNode = (node: MintNode): node is MintTextNode => {
  return typeof node === "string" || typeof node === "number";
};

export const isEmptyNode = (node: MintNode): node is MintEmptyNode => {
  return typeof node === "boolean" || node == null;
};

export const isReactive = (value: any): value is Reactive => {
  return value instanceof State || value instanceof Computed;
};

/** From MintNodes to a flattened array of MintElements */
export const filterNodes = (...nodes: MintNode[]) => {
  const elements: MintElement[] = [];

  for (const node of nodes.flat(Infinity as 1)) {
    if (isEmptyNode(node)) continue;
    if (isTextNode(node)) {
      elements.push(
        new MintElement({
          type: "text",
          data: {
            text: String(node),
          },
        })
      );
    }
    //
    else if (isReactive(node)) {
      elements.push(
        new MintElement({
          type: "reactive",
          data: {
            reactive: node,
          },
        })
      );
    }
    //
    else {
      elements.push(node as unknown as MintElement);
    }
  }

  return elements;
};

export const initElementsChildren = (el: MintElement) => {
  el.data.children.forEach((c: MintElement, i: number) => {
    c.parent = el;
    c.index = i;
  });
};

export const getReactiveValue = (value: any) => {
  return isReactive(value) ? value.value : value;
};

export const isParentElement = (el: MintElement) => {
  return ["dom", "comp", "provider", "frag", "show", "list"].includes(el.type);
};
