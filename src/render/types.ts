import {
  MintDOMElement,
  MintElement,
  MintParentElement,
  MintReactiveElement,
  MintTextElement,
} from "../elements";

export type MintRenderer<Node, RenderArgs> = {
  dom: HTMLElementRenderer<Node>;
  text: TextElementRenderer<Node>;
  reactive: ReactiveElementRenderer<Node>;
  insertElements: (parent: MintParentElement, elements: MintElement[]) => void;
  render: (nodes: Node[], container: RenderArgs) => void;
};

export type HTMLElementRenderer<Node> = {
  create(args: { el: MintDOMElement<Node> }): Node[];
  handleChildNodes(args: { el: MintDOMElement<Node>; nodes: Node[] }): void;
  setProp(args: {
    el: MintDOMElement<Node>;
    propKey: string;
    propValue: any;
  }): void;
  setEventListener(args: {
    el: MintDOMElement<Node>;
    eventType: string;
    eventListener: any;
  }): void;
  destroy(args: { el: MintDOMElement<Node> }): void;
};

export type TextElementRenderer<Node> = {
  create(args: { el: MintTextElement<Node> }): Node[];
  destroy(args: { el: MintTextElement<Node> }): void;
};

export type ReactiveElementRenderer<Node> = {
  create(args: { el: MintReactiveElement<Node> }): Node[];
  update(args: { el: MintReactiveElement<Node>; newValue: any }): void;
  destroy(args: { el: MintReactiveElement<Node> }): void;
};
