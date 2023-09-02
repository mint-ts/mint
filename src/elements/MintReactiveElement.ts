import { MintRenderer, TextElementHTMLNode } from "../render";
import { Reactive } from "../types";
import { CleanupFn, MintElementContract, MintParentElement } from "./types";

export class MintReactiveElement<Node = any>
  implements MintElementContract<Node>
{
  constructor(reactive: Reactive, renderer: MintRenderer<Node>) {
    this.reactive = reactive;
    this.renderer = renderer;
  }
  type = "reactive" as const;
  reactive;
  renderer;
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  node: Node | undefined;
  htmlNode: TextElementHTMLNode | undefined;
  cleanups = new Set<CleanupFn>();

  getNodes() {
    return this.node ? [this.node] : [];
  }

  create() {
    const result = this.renderer.createReactiveElement(this)[0];
    this.node = result;

    this.cleanups.add(
      this.reactive.subscribe(() => {
        this.renderer.updateReactiveElement(this);
      })
    );

    return [result];
  }

  onInsertion(): void {}

  destroy() {
    this.cleanups.forEach((c) => c());
    this.renderer.destroyReactiveElement(this);
    this.node = undefined;
  }
}
