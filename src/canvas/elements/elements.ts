import { MintElement } from "../../types";
import { CanvasNode } from "../types";

export type CanvasElement = MintElement & {
  _type: typeof CANVAS_ELEMENT_TYPE;
  tag: string;
  props: Record<string, any>;
  node?: CanvasNode;
};

export const createCanvasElement = (
  tag: string,
  props: Record<string, any>
): CanvasElement => {
  return {
    _type: CANVAS_ELEMENT_TYPE,
    tag,
    props,
    index: 0,
  };
};

export const CANVAS_ELEMENT_TYPE = "mint_canvas_el";
