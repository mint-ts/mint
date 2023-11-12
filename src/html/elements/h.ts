import { ElementFactory } from "../../core";
import { HTMLElementPropMap, SVGElementPropMap } from "../types";
import { HtmlElement } from "./HtmlElement";
import { htmlTags } from "./htmlTags";
import { svgTags } from "./svgTags";

const html =
  <Tag extends AllKeys>(tag: Tag) =>
  (props?: AllMap[Tag]) => {
    return new ElementFactory((api) => new HtmlElement(tag, props ?? {}, api));
  };

const allTags = [...htmlTags, ...svgTags];

export const h = allTags.reduce((_h, tag) => {
  _h[tag] = html(tag);
  return _h;
}, {} as HObject);

type AllKeys = keyof HTMLElementPropMap | keyof SVGElementPropMap;

type AllMap = HTMLElementPropMap & SVGElementPropMap;

export type HObject = {
  [key in AllKeys]: ReturnType<typeof html<key>>;
};
