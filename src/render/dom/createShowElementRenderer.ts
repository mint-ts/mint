import { MintTree } from "../../MintTree";
import { ShowElementRenderer } from "../types";
import { DOMNode } from "./types";

export const createShowElementRenderer = (
  tree: MintTree
): ShowElementRenderer<DOMNode> => {
  return {
    create({ el }) {
      return tree.createFromMultiple(el.children);
    },
    onShowNodes(args) {},
    onHideNodes(args) {},
    destroy(args) {},
  };
};
