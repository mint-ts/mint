import { createElementFactory } from "../../core";
import { CanvasElementPropMap } from "../types";
import { createCanvasElement } from "./elements";

type Key = keyof CanvasElementPropMap;

const tags: Key[] = ["rect", "circle"];

const cnvs =
  <Tag extends Key>(tag: Tag) =>
  (props: CanvasElementPropMap[Tag]) => {
    return createElementFactory(() => createCanvasElement(tag, props));
  };

export const c = tags.reduce((_h, tag) => {
  _h[tag] = cnvs(tag);
  return _h;
}, {} as CObject);

export type CObject = {
  [key in Key]: ReturnType<typeof cnvs<key>>;
};
