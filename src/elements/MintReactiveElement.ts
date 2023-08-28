import { MintTree } from "../MintTree";
import { TextElementHTMLNode } from "../render";
import { Reactive } from "../types";
import { CleanupFn, MintElementLifecycle, MintParentElement } from "./types";

export class MintReactiveElement<Node = any> implements MintElementLifecycle {
  constructor({ reactive, tree }: MintReactiveElementArgs) {
    this.reactive = reactive;
    this.tree = tree;
  }
  type = "reactive" as const;
  reactive;
  tree;
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  node: Node | undefined;
  htmlNode: TextElementHTMLNode | undefined;
  cleanups = new Set<CleanupFn>();

  getNodes() {
    return this.node ? [this.node] : [];
  }

  create() {
    this.node = this.tree.renderer.reactive.create({ el: this })[0];

    this.cleanups.add(
      this.reactive.subscribe(() => {
        this.tree.renderer.reactive.update({
          el: this,
          newValue: this.reactive.value,
        });
      })
    );

    return [this.node];
  }

  destroy() {
    this.cleanups.forEach((c) => c());
    this.tree.renderer.reactive.destroy({ el: this });
  }
}

export type MintReactiveElementArgs = {
  reactive: Reactive;
  tree: MintTree;
};
