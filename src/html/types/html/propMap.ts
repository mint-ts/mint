import { HTMLAnchorElementProps } from "./a";
import { HTMLButtonElementProps } from "./button";
import { HTMLCanvasElementProps } from "./canvas";
import { HTMLFieldSetElementProps } from "./fieldset";
import { HTMLFormElementProps } from "./form";
import { HTMLIFrameElementProps } from "./iframe";
import { HTMLImageElementProps } from "./img";
import { HTMLInputElementProps } from "./input";
import { HTMLLabelElementProps } from "./label";
import { HTMLObjectElementProps } from "./object";
import { HTMLOListElementProps } from "./ol";
import { HTMLOptionElementProps } from "./option";
import { HTMLProgressElementProps } from "./progress";
import { HTMLQuoteElementProps } from "./quote";
import { HTMLSelectElementProps } from "./select";
import {
  HTMLAudioElementProps,
  HTMLBRElementProps,
  HTMLDivElementProps,
  HTMLElementProps,
  HTMLHRElementProps,
  HTMLHeadingElementProps,
  HTMLLIElementProps,
  HTMLLegendElementProps,
  HTMLParagraphElementProps,
  HTMLPreElementProps,
  HTMLSpanElementProps,
  HTMLTableRowProps,
  HTMLTableSectionElementProps,
  HTMLUListElementProps,
} from "./simple";
import { HTMLSourceElementProps } from "./source";
import { HTMLTableElementProps } from "./table";
import { HTMLTableDataCellElementProps } from "./td";
import { HTMLTextAreaProps } from "./textarea";
import { HTMLTableHeaderCellElementProps } from "./th";
import { HTMLVideoElementProps } from "./video";

export type HTMLElementPropMap = {
  a: HTMLAnchorElementProps;
  article: HTMLElementProps;
  aside: HTMLElementProps;
  audio: HTMLAudioElementProps;
  blockquote: HTMLQuoteElementProps;
  br: HTMLBRElementProps;
  button: HTMLButtonElementProps;
  canvas: HTMLCanvasElementProps;
  code: HTMLElementProps;
  div: HTMLDivElementProps;
  em: HTMLElementProps;
  fieldset: HTMLFieldSetElementProps;
  footer: HTMLElementProps;
  form: HTMLFormElementProps;
  h1: HTMLHeadingElementProps;
  h2: HTMLHeadingElementProps;
  h3: HTMLHeadingElementProps;
  h4: HTMLHeadingElementProps;
  h5: HTMLHeadingElementProps;
  h6: HTMLHeadingElementProps;
  header: HTMLElementProps;
  hr: HTMLHRElementProps;
  iframe: HTMLIFrameElementProps;
  img: HTMLImageElementProps;
  input: HTMLInputElementProps;
  label: HTMLLabelElementProps;
  legend: HTMLLegendElementProps;
  li: HTMLLIElementProps;
  main: HTMLElementProps;
  nav: HTMLElementProps;
  object: HTMLObjectElementProps;
  ol: HTMLOListElementProps;
  option: HTMLOptionElementProps;
  p: HTMLParagraphElementProps;
  pre: HTMLPreElementProps;
  progress: HTMLProgressElementProps;
  select: HTMLSelectElementProps;
  small: HTMLElementProps;
  source: HTMLSourceElementProps;
  span: HTMLSpanElementProps;
  strong: HTMLElementProps;
  sub: HTMLElementProps;
  sup: HTMLElementProps;
  table: HTMLTableElementProps;
  tbody: HTMLTableSectionElementProps;
  td: HTMLTableDataCellElementProps;
  textarea: HTMLTextAreaProps;
  tfoot: HTMLTableSectionElementProps;
  thead: HTMLTableSectionElementProps;
  tr: HTMLTableRowProps;
  th: HTMLTableHeaderCellElementProps;
  ul: HTMLUListElementProps;
  video: HTMLVideoElementProps;
  q: HTMLQuoteElementProps;
};
