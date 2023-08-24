import { MintElement } from "../../elements";
import { create } from "./create";
import { HTMLNode } from "./types";

export const createMultiple = (...els: MintElement[]) => {
  return els.map((child) => create(child)).flat(Infinity) as HTMLNode[];
};
