import { createElementFactory } from "../../core";
import { HTMLElementPropMap, SVGElementPropMap } from "../types";
import { createHtmlElement } from "./defs";
import { htmlTags } from "./htmlTags";
import { svgTags } from "./svgTags";

const html =
  <Tag extends AllKeys>(tag: Tag) =>
  (props?: AllMap[Tag]) => {
    const { c: children, ...rest } = props ?? {};
    let c = children ?? [];
    if (!Array.isArray(c)) {
      c = [c];
    }
    const isSvg = svgTags.includes(tag as any);

    return createElementFactory((core) =>
      createHtmlElement(
        tag,
        rest ?? {},
        core.createElements(...(c as any)),
        isSvg
      )
    );
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
