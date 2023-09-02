import { MintRenderer, TextElementHTMLNode } from "../render";
import { CleanupFn, MintElementContract, MintParentElement } from "./types";

export class MintTextElement<Node = any> implements MintElementContract<Node> {
  constructor(text: string, renderer: MintRenderer<Node>) {
    this.text = text;
    this.renderer = renderer;
  }
  type = "text" as const;
  text;
  index = 0;
  parent: MintParentElement | undefined;
  node: Node | undefined;
  htmlNode: TextElementHTMLNode | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
  renderer;

  getNodes() {
    return this.node ? [this.node] : [];
  }

  create() {
    const result = this.renderer.createTextElement(this)[0];
    this.node = result;
    return [result];
  }

  onInsertion(): void {}

  destroy() {
    this.renderer.destroyTextElement(this);
    this.node = undefined;
  }
}
