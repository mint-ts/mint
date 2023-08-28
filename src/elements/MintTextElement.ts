import { MintTree } from "../MintTree";
import { TextElementHTMLNode } from "../render";
import { CleanupFn, MintElementLifecycle, MintParentElement } from "./types";

export class MintTextElement<Node = any> implements MintElementLifecycle {
  constructor({ text, tree }: MintTextElementArgs) {
    this.text = text;
    this.tree = tree;
  }
  type = "text" as const;
  text;
  index = 0;
  parent: MintParentElement | undefined;
  node: Node | undefined;
  htmlNode: TextElementHTMLNode | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
  tree;

  getNodes() {
    return this.node ? [this.node] : [];
  }

  create() {
    this.node = this.tree.renderer.text.create({ el: this })[0];
    return [this.node];
  }

  destroy() {
    this.tree.renderer.text.destroy({ el: this });
  }
}

export type MintTextElementArgs = {
  text: string;
  tree: MintTree;
};
