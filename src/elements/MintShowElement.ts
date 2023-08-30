import { MintTree } from "../MintTree";
import { ShowElementHTMLNode } from "../render";
import { Reactive } from "../types";
import { initElementsChildren } from "../utils";
import {
  CleanupFn,
  MintElement,
  MintElementLifecycle,
  MintParentElement,
} from "./types";

export class MintShowElement implements MintElementLifecycle {
  constructor({ when, yes, no, tree }: MintShowElementArgs) {
    this.when = when;
    this.yes = yes;
    this.no = no;
    this.tree = tree;
  }

  type = "show" as const;
  when;
  yes;
  no;
  tree;
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
  htmlNode: ShowElementHTMLNode | undefined;

  get condition() {
    return Boolean(this.when.value);
  }

  get prevCondition() {
    return Boolean(this.when.prevValue);
  }

  get children() {
    return this.condition ? this.yes : this.no;
  }

  get notShownChildren() {
    return this.condition ? this.no : this.yes;
  }

  getNodes() {
    return this.tree.getNodes(...this.children);
  }

  create() {
    initElementsChildren(this, ...this.children);

    this.cleanups.add(
      this.when.subscribe(() => {
        if (this.condition === this.prevCondition) return;
        this.tree.destroyMultiple(this.notShownChildren);
        initElementsChildren(this, ...this.children);
        this.tree.createFromMultiple(this.children);
        this.tree.renderer.insertElements(this, this.children);
      })
    );

    return this.tree.createFromMultiple(this.children);
  }

  destroy() {
    this.children.forEach((c) => c.destroy());
    this.cleanups.forEach((c) => c());
  }
}

export type MintShowElementArgs = {
  when: Reactive;
  yes: MintElement[];
  no: MintElement[];
  tree: MintTree;
};
