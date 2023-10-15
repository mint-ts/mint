import { HTMLAnchorElementProps } from "./a";
import { HTMLAreaElementProps } from "./area";
import { HTMLBaseElementProps } from "./base";
import { HTMLButtonElementProps } from "./button";
import { HTMLCanvasElementProps } from "./canvas";
import { HTMLTableColElementProps } from "./col";
import { HTMLTableColGroupElementProps } from "./colgroup";
import { HTMLDataElementProps } from "./data";
import { HTMLDetailsElementProps } from "./details";
import { HTMLDialogElementProps } from "./dialog";
import { HTMLEmbedElementProps } from "./embed";
import { HTMLFieldSetElementProps } from "./fieldset";
import { HTMLFormElementProps } from "./form";
import { HTMLIFrameElementProps } from "./iframe";
import { HTMLImageElementProps } from "./img";
import { HTMLInputElementProps } from "./input";
import { HTMLKeygenElementProps } from "./keygen";
import { HTMLLabelElementProps } from "./label";
import { HTMLLinkElementProps } from "./link";
import { HTMLObjectElementProps } from "./object";
import { HTMLOListElementProps } from "./ol";
import { HTMLOptionElementProps } from "./option";
import { HTMLProgressElementProps } from "./progress";
import { HTMLQuoteElementProps } from "./quote";
import { HTMLSelectElementProps } from "./select";
import {
  HTMLAudioElementProps,
  HTMLBRElementProps,
  HTMLBodyElementProps,
  HTMLDListElementProps,
  HTMLDataListElementProps,
  HTMLDivElementProps,
  HTMLElementProps,
  HTMLHRElementProps,
  HTMLHeadElementProps,
  HTMLHeadingElementProps,
  HTMLHtmlElementProps,
  HTMLLIElementProps,
  HTMLLegendElementProps,
  HTMLModElementProps,
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
  abbr: HTMLElementProps;
  address: HTMLElementProps;
  area: HTMLAreaElementProps;
  article: HTMLElementProps;
  aside: HTMLElementProps;
  audio: HTMLAudioElementProps;
  b: HTMLElementProps;
  base: HTMLBaseElementProps;
  bdi: HTMLElementProps;
  bdo: HTMLElementProps;
  big: HTMLElementProps;
  blockquote: HTMLQuoteElementProps;
  body: HTMLBodyElementProps;
  br: HTMLBRElementProps;
  button: HTMLButtonElementProps;
  canvas: HTMLCanvasElementProps;
  caption: HTMLElementProps;
  center: HTMLElementProps;
  cite: HTMLElementProps;
  code: HTMLElementProps;
  col: HTMLTableColElementProps;
  colgroup: HTMLTableColGroupElementProps;
  data: HTMLDataElementProps;
  datalist: HTMLDataListElementProps;
  dd: HTMLElementProps;
  del: HTMLModElementProps;
  details: HTMLDetailsElementProps;
  dfn: HTMLElementProps;
  dialog: HTMLDialogElementProps;
  div: HTMLDivElementProps;
  dl: HTMLDListElementProps;
  dt: HTMLElementProps;
  em: HTMLElementProps;
  embed: HTMLEmbedElementProps;
  fieldset: HTMLFieldSetElementProps;
  figcaption: HTMLElementProps;
  figure: HTMLElementProps;
  footer: HTMLElementProps;
  form: HTMLFormElementProps;
  h1: HTMLHeadingElementProps;
  h2: HTMLHeadingElementProps;
  h3: HTMLHeadingElementProps;
  h4: HTMLHeadingElementProps;
  h5: HTMLHeadingElementProps;
  h6: HTMLHeadingElementProps;
  head: HTMLHeadElementProps;
  header: HTMLElementProps;
  hgroup: HTMLElementProps;
  hr: HTMLHRElementProps;
  html: HTMLHtmlElementProps;
  i: HTMLElementProps;
  iframe: HTMLIFrameElementProps;
  img: HTMLImageElementProps;
  input: HTMLInputElementProps;
  ins: HTMLModElementProps;
  kbd: HTMLElementProps;
  keygen: HTMLKeygenElementProps;
  label: HTMLLabelElementProps;
  legend: HTMLLegendElementProps;
  li: HTMLLIElementProps;
  link: HTMLLinkElementProps;
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
