import { Context } from "../context";
import { MintRenderer } from "../render";
import { initElementsChildren } from "../utils";
import {
  CleanupFn,
  MintElement,
  MintElementContract,
  MintParentElement,
} from "./types";

export class MintProviderElement<Node = any>
  implements MintElementContract<Node>
{
  constructor(
    value: any,
    children: MintElement[],
    context: Context,
    renderer: MintRenderer<Node>
  ) {
    this.value = value;
    this.children = children;
    this.context = context;
    this.renderer = renderer;

    initElementsChildren(this, ...this.children);
  }
  type = "provider" as const;
  value;
  children;
  context;
  renderer;
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();

  getNodes() {
    return this.renderer.getNodes(...this.children);
  }

  create() {
    return this.renderer.createFromMultiple(this.children);
  }

  onInsertion(): void {}

  destroy() {
    this.children.forEach((c) => c.destroy());
  }
}
