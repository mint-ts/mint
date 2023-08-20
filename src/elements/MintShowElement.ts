import { Reactive } from "../types";
import { initElementsChildren } from "../utils";
import { CleanupFn, MintElement, MintParentElement } from "./types";

export class MintShowElement {
  constructor(when: Reactive, children: MintElement[]) {
    this.when = when;
    this.children = children;

    initElementsChildren(this);
  }
  type = "show" as const;
  when;
  children;
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
}
