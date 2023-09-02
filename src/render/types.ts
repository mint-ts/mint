import {
  MintComponentElement,
  MintElement,
  MintHTMLElement,
  MintReactiveElement,
  MintTextElement,
} from "../elements";
import { MintNode } from "../types";

export interface MintRenderer<Node> {
  getNodes(...elements: MintElement<Node>[]): Node[];
  createFromMultiple(elements: MintElement<Node>[]): Node[];
  onInsertion(elements: MintElement<Node>[]): void;
  destroyMultiple(elements: MintElement<Node>[]): void;
  createTextElement(el: MintTextElement): Node;
  destroyTextElement(el: MintTextElement): void;
  createReactiveElement(el: MintReactiveElement<Node>): Node;
  updateReactiveElement(el: MintReactiveElement<Node>): void;
  destroyReactiveElement(el: MintReactiveElement<Node>): void;
  nodesToElements(...nodes: MintNode[]): MintElement<Node>[];
  insertElements(
    parent: MintElement<Node>,
    children: MintElement<Node>[]
  ): void;
  currentComponent: MintComponentElement | undefined;
}

export interface HTMLElementRenderer<Node> {
  createHTMLElement(el: MintHTMLElement<Node>): Node;
  setHTMLElementProp(
    el: MintHTMLElement<Node>,
    propKey: string,
    propValue: any
  ): void;
  addHTMLElementChildren(el: MintHTMLElement<Node>, nodes: Node[]): void;
  destroyHTMLElement(el: MintHTMLElement<Node>): void;
}
