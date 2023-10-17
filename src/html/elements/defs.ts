import { MintElementCoreWorksWith } from "../../core";
import { Reactive } from "../../reactive";
import { MintElement } from "../../types";
import { isObject } from "../../utils";
import { HtmlElementNode, TextElementHtmlNode } from "../string";

export type HtmlElement = MintElement & {
  _type: typeof HTML_ELEMENT_TYPE;
  tag: string;
  props: Record<string, any>;
  domNode?: HTMLElement | SVGElement;
  htmlNode?: HtmlElementNode;
  children: MintElementCoreWorksWith<any>[];
  isSvg: boolean;
  disposers: Function[];
};

export type TextElement = MintElement & {
  _type: typeof TEXT_ELEMENT_TYPE;
  text: string | Reactive<string>;
  domNode?: Text;
  htmlNode?: TextElementHtmlNode;
};

export type HtmlSupportedElements = HtmlElement | TextElement;

const HTML_ELEMENT_TYPE = "mint_html_el";
const TEXT_ELEMENT_TYPE = "mint_html_text";

export const createHtmlElement = (
  tag: string,
  props: any,
  children: MintElementCoreWorksWith<any>[],
  isSvg: boolean
): HtmlElement => ({
  _type: HTML_ELEMENT_TYPE,
  tag,
  props,
  children,
  index: 0,
  isSvg,
  disposers: [],
});

export const createTextElement = (
  text: Reactive<string> | string
): TextElement => ({
  _type: TEXT_ELEMENT_TYPE,
  text,
  index: 0,
});

export const isHtmlElementOfType = <Type extends keyof ElTypeMap>(
  v: any,
  type: Type
): v is ElTypeMap[Type] => {
  return isObject(v) && v["_type"] === typeMap[type];
};

type ElTypeMap = {
  html: HtmlElement;
  text: TextElement;
};

const typeMap = {
  html: HTML_ELEMENT_TYPE,
  text: TEXT_ELEMENT_TYPE,
};
