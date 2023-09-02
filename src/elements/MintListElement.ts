import { getPatch } from "fast-array-diff";
import { MintRenderer } from "../render";
import { MintNode, Reactive } from "../types";
import { initElementsChildren } from "../utils";
import {
  CleanupFn,
  MintElement,
  MintElementContract,
  MintParentElement,
} from "./types";

export class MintListElement<Node = any> implements MintElementContract<Node> {
  constructor(
    array: Reactive<any[]>,
    render: (item: any) => MintNode,
    renderer: MintRenderer<Node>
  ) {
    this.array = array;
    this.render = render;
    this.renderer = renderer;
  }
  type = "list" as const;
  array;
  render;
  renderer;
  children: MintElement[] = [];
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();

  getNodes(): Node[] {
    return this.renderer.getNodes(...this.children);
  }

  create() {
    const elements = this.renderer.nodesToElements(
      ...this.array.value.map(this.render)
    );
    initElementsChildren(this, ...elements);
    this.children = elements;

    const unsub = this.array.subscribe(() => {
      this.patch();
    });

    this.cleanups.add(unsub);

    return this.renderer.createFromMultiple(this.children);
  }

  onInsertion(): void {}

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
          const elements = this.renderer.nodesToElements(...nodes);
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
