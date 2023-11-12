import { ElementFactory } from "../core";
import { CanvasElement } from "./CanvasElement";
import { CanvasElementPropMap } from "./types";

const cnvs =
  <Tag extends Keys>(tag: Tag) =>
  (props?: CanvasElementPropMap[Tag]) => {
    const { ...rest } = props ?? {};
    return new ElementFactory(() => new CanvasElement(tag, rest ?? {}));
  };

const canvasTags: Keys[] = ["rect", "circle"];

export const c = canvasTags.reduce((_c, tag) => {
  _c[tag] = cnvs(tag);
  return _c;
}, {} as CObject);

export type CObject = {
  [key in Keys]: ReturnType<typeof cnvs<key>>;
};

type Keys = keyof CanvasElementPropMap;
