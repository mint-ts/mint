import { ShowElementHTMLNode } from "../render";
import { Reactive } from "../types";
import { initElementsChildren } from "../utils";
import { CleanupFn, MintElement, MintParentElement } from "./types";

export class MintShowElement {
  constructor(when: Reactive, yes: MintElement[], no: MintElement[] = []) {
    this.when = when;
    this.yes = yes;
    this.no = no;

    initElementsChildren(this, ...this.children);
  }

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

  type = "show" as const;
  when;
  yes;
  no;
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
  htmlNode: ShowElementHTMLNode | undefined;
}
