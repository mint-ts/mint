import { MintTree } from "../MintTree";
import { Context } from "../context";
import { initElementsChildren } from "../utils";
import {
  CleanupFn,
  MintElement,
  MintElementLifecycle,
  MintParentElement,
} from "./types";

export class MintProviderElement implements MintElementLifecycle {
  constructor({ value, children, context, tree }: MintProviderElementArgs) {
    this.value = value;
    this.children = children;
    this.context = context;
    this.tree = tree;

    initElementsChildren(this, ...this.children);
  }
  type = "provider" as const;
  value;
  children;
  context;
  tree;
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();

  getNodes() {
    return this.tree.getNodes(...this.children);
  }

  create() {
    return this.tree.createFromMultiple(this.children);
  }

  destroy() {
    this.children.forEach((c) => c.destroy());
  }
}

export type MintProviderElementArgs = {
  value: any;
  children: MintElement[];
  context: Context;
  tree: MintTree;
};
