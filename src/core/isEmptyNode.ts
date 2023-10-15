import { MintEmptyNode, MintNode } from "../types";

export const isEmptyNode = (node: MintNode): node is MintEmptyNode => {
  return typeof node === "boolean" || node == null;
};
