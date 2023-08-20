import {
  MintElement,
  MintParentElement,
  MintReactiveElement,
  MintTextElement,
} from "./elements";
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

export const initElementsChildren = (el: MintParentElement) => {
  el.children.forEach((child, i) => {
    child.parent = el;
    child.index = i;
  });
};

export const getReactiveValue = <T>(value: T | Reactive<T>) => {
  return isReactive(value) ? value.value : value;
};

export const isParentElement = (el: MintElement): el is MintParentElement => {
  return ["dom", "component", "provider", "show", "list"].includes(el.type);
};
