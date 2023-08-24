export type DOMElementHTMLNode = {
  type: "dom";
  tag: string;
  props: Record<string, string>;
  children: HTMLNode[];
};

export type TextElementHTMLNode = {
  type: "text";
  text: string;
};

export type ShowElementHTMLNode = {
  type: "show";
  isShown: boolean;
  children: HTMLNode[];
};

export type HTMLNode =
  | DOMElementHTMLNode
  | ShowElementHTMLNode
  | TextElementHTMLNode;
