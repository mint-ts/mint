import { HtmlElement, TextElement } from "../elements";

const HTML_EL_TYPE = "mint_html_el";
const TEXT_EL_TYPE = "mint_text_el";

export const TYPE_MAP = {
  html: HTML_EL_TYPE,
  text: TEXT_EL_TYPE,
};

export type TypeMap = {
  html: HtmlElement;
  text: TextElement;
};
