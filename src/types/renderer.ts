import {
  MintElementCoreWorksWith,
  MintListElement,
  MintShowElement,
} from "../core";
import { MintElement, MintNode } from "./elements";

export type MintRenderer<SupportedElement extends MintElement, Node> = {
  createElement(node: MintNode): any;
  getNode(el: SupportedElement): Node | undefined;
  createNode(el: SupportedElement): Node;
  insertShowNodes(
    el: MintShowElement,
    elements: MintElementCoreWorksWith<SupportedElement>[]
  ): void;
  destroyNode(el: SupportedElement): void;
  patchList(el: MintListElement<any>): void;
  flushUpdates?: (fns: Function[]) => void;
};
