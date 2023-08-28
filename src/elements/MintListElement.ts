import { getPatch } from "fast-array-diff";
import { MintTree } from "../MintTree";
import { MintNode, Reactive } from "../types";
import { initElementsChildren } from "../utils";
import {
  CleanupFn,
  MintElement,
  MintElementLifecycle,
  MintParentElement,
} from "./types";

export class MintListElement implements MintElementLifecycle {
  constructor({ array, render, tree }: MintListElementArgs) {
    this.array = array;
    this.render = render;
    this.tree = tree;
  }
  type = "list" as const;
  array;
  render;
  tree;
  children: MintElement[] = [];
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();

  getNodes() {
    return this.tree.getNodes(...this.children);
  }

  create() {
    const elements = this.tree.nodesToElements(
      ...this.array.value.map(this.render)
    );
    initElementsChildren(this, ...elements);
    this.children = elements;

    const unsub = this.array.subscribe(() => {
      this.patch();
    });

    this.cleanups.add(unsub);

    return [];
  }

  destroy() {
    this.children.forEach((c) => c.destroy());
    this.cleanups.forEach((c) => c());
  }

  private patch() {
    const patchItems = getPatch(this.array.prevValue, this.array.value);

    for (const patchItem of patchItems) {
      switch (patchItem.type) {
        case "add": {
          const nodes = patchItem.items.map((item) => this.render(item));
          const elements = this.tree.nodesToElements(...nodes);
          this.children = [
            ...this.children.slice(0, patchItem.newPos),
            ...elements,
            ...this.children.slice(patchItem.newPos),
          ];
          elements.forEach((child, i) => {
            child.parent = this;
            child.index = patchItem.newPos + i;
          });
          // this.tree.renderer.onListAddElements({
          //   el: this,
          //   newElements: elements,
          //   index: patchItem.newPos,
          // });
          break;
        }
        case "remove": {
          // this.tree.renderer.onListRemoveElements({
          //   el: this,
          //   removedElements: this.children.slice(
          //     patchItem.newPos,
          //     patchItem.newPos + patchItem.items.length
          //   ),
          //   index: patchItem.newPos,
          // });
          this.children = [
            ...this.children.slice(0, patchItem.newPos),
            ...this.children.slice(patchItem.newPos + patchItem.items.length),
          ];
          break;
        }
      }
    }
  }
}

export type MintListElementArgs = {
  array: Reactive<any[]>;
  render: (item: any) => MintNode;
  tree: MintTree;
};
