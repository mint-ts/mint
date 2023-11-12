import { MintEmptyNode, MintNode } from "..";

export const isEmptyNode = (node: MintNode): node is MintEmptyNode => {
  return typeof node === "boolean" || node == null;
};
