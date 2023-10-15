export type HtmlElementNode = {
  type: "html";
  tag: string;
  props: Record<string, any>;
  children: HtmlNode[];
};

export type TextElementHtmlNode = {
  type: "text";
  text: string;
};

export type ShowElementHtmlNode = {
  type: "show";
  children: HtmlNode[];
};

export type HtmlNode =
  | HtmlElementNode
  | ShowElementHtmlNode
  | TextElementHtmlNode;
