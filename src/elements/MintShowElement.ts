import { MintRenderer, ShowElementHTMLNode } from "../render";
import { Reactive } from "../types";
import { initElementsChildren } from "../utils";
import {
  CleanupFn,
  MintElement,
  MintElementContract,
  MintParentElement,
} from "./types";

export class MintShowElement<Node = any> implements MintElementContract<Node> {
  constructor(
    when: Reactive,
    yes: MintElement[],
    no: MintElement[],
    renderer: MintRenderer<Node>
  ) {
    this.when = when;
    this.yes = yes;
    this.no = no;
    this.renderer = renderer;
  }

  type = "show" as const;
  when;
  yes;
  no;
  renderer;
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

  getNodes(): Node[] {
    return this.renderer.getNodes(...this.children);
  }

  create() {
    initElementsChildren(this, ...this.children);

    this.cleanups.add(
      this.when.subscribe(() => {
        if (this.condition === this.prevCondition) return;
        this.renderer.destroyMultiple(this.notShownChildren);
        initElementsChildren(this, ...this.children);
        this.renderer.createFromMultiple(this.children);
        this.renderer.insertElements(this, this.children);
      })
    );

    return this.renderer.createFromMultiple(this.children);
  }

  onInsertion(): void {}

  destroy() {
    this.children.forEach((c) => c.destroy());
    this.cleanups.forEach((c) => c());
  }
}
