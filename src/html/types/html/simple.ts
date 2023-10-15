import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLElementProps = MintHTMLElementProps<HTMLElement>;

export type HTMLDivElementProps = MintHTMLElementProps<HTMLDivElement>;

export type HTMLUListElementProps = MintHTMLElementProps<HTMLUListElement>;

export type HTMLLIElementProps = MintHTMLElementProps<HTMLLIElement>;

export type HTMLHeadingElementProps = MintHTMLElementProps<HTMLHeadingElement>;

export type HTMLTableRowProps = MintHTMLElementProps<HTMLTableRowElement>;

export type HTMLSpanElementProps = MintHTMLElementProps<HTMLSpanElement>;

export type HTMLTableSectionElementProps =
  MintHTMLElementProps<HTMLTableSectionElement>;

export type HTMLBRElementProps = MintHTMLElementProps<HTMLBRElement>;

export type HTMLHRElementProps = MintHTMLElementProps<HTMLHRElement>;

export type HTMLLegendElementProps = MintHTMLElementProps<HTMLLegendElement>;

export type HTMLParagraphElementProps =
  MintHTMLElementProps<HTMLParagraphElement>;

export type HTMLPreElementProps = MintHTMLElementProps<HTMLPreElement>;

export type HTMLAudioElementProps = MintHTMLElementProps<HTMLAudioElement>;

export type HTMLBodyElementProps = MintHTMLElementProps<HTMLBodyElement>;

export type HTMLDataListElementProps =
  MintHTMLElementProps<HTMLDataListElement>;

export type HTMLDListElementProps = MintHTMLElementProps<HTMLDListElement>;

export type HTMLHeadElementProps = MintHTMLElementProps<HTMLHeadElement>;

export type HTMLHtmlElementProps = MintHTMLElementProps<HTMLHtmlElement>;

export type HTMLModElementAttributes = {
  cite?: string | undefined;
  dateTime?: string | undefined;
};

export type HTMLModElementProps = MintHTMLElementProps<HTMLModElement> &
  MintReactiveProps<HTMLModElementAttributes>;
