import { MintNode, MintTextNode } from "../types";

export const isTextNode = (node: MintNode): node is MintTextNode => {
  return typeof node === "string" || typeof node === "number";
};
