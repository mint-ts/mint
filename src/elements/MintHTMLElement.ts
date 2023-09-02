import { HTMLElementRenderer, MintRenderer } from "../render";
import { getReactiveValue, initElementsChildren, isReactive } from "../utils";
import {
  CleanupFn,
  MintElement,
  MintElementContract,
  MintParentElement,
} from "./types";

export class MintHTMLElement<Node = any> implements MintElementContract<Node> {
  constructor(
    tag: string,
    props: object,
    children: MintElement[],
    renderer: MintRenderer<Node> & HTMLElementRenderer<Node>
  ) {
    this.tag = tag;
    this.props = props;
    this.children = children;
    this.renderer = renderer;
  }
  type = "dom" as const;
  tag;
  props;
  children;
  renderer;
  isInserted = false;
  node: Node | undefined;
  index = 0;
  parent: MintParentElement | undefined;
  private cleanups = new Set<CleanupFn>();

  getNodes() {
    return this.node ? [this.node] : [];
  }

  create() {
    initElementsChildren(this, ...this.children);
    const result = this.renderer.createHTMLElement(this);
    this.node = result;
    this.renderer.addHTMLElementChildren(
      this,
      this.renderer.createFromMultiple(this.children)
    );
    this.handleProps();

    return [result];
  }

  onInsertion(): void {}

  destroy() {
    this.children.forEach((c) => c.destroy());
    this.cleanups.forEach((c) => c());
    this.renderer.destroyHTMLElement(this);
  }

  private handleProps() {
    for (const [key, value] of Object.entries(this.props)) {
      this.renderer.setHTMLElementProp(this, key, getReactiveValue(value));
      if (isReactive(value)) {
        this.cleanups.add(
          value.subscribe(() => {
            this.renderer.setHTMLElementProp(
              this,
              key,
              getReactiveValue(value)
            );
          })
        );
      }
    }
  }
}
