import { MintNode, Reactive } from "../types";
import { CleanupFn, MintElement, MintParentElement } from "./types";

export class MintListElement {
  constructor(array: Reactive<any[]>, render: (item: any) => MintNode) {
    this.array = array;
    this.render = render;
    this.prevArray = [...this.array.value];
  }
  type = "list" as const;
  array;
  render;
  children: MintElement[] = [];
  prevArray;
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
}
