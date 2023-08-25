import { Context } from "../context";
import { initElementsChildren } from "../utils";
import { CleanupFn, MintElement, MintParentElement } from "./types";

export class MintProviderElement {
  constructor(value: any, children: MintElement[], context: Context) {
    this.value = value;
    this.children = children;
    this.context = context;

    initElementsChildren(this, ...this.children);
  }
  type = "provider" as const;
  value;
  children;
  context;
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
}
