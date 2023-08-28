import { MintTree } from "../MintTree";
import { initElementsChildren, isReactive } from "../utils";
import {
  CleanupFn,
  MintElement,
  MintElementLifecycle,
  MintParentElement,
} from "./types";

export class MintDOMElement<Node = any> implements MintElementLifecycle {
  constructor({ tag, props, children, tree }: MintDOMElementArgs) {
    this.tag = tag;
    this.props = props;
    this.children = children;
    this.tree = tree;
  }
  type = "dom" as const;
  tag;
  props;
  children;
  tree;
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
    this.node = this.tree.renderer.dom.create({ el: this })[0];
    this.tree.renderer.dom.handleChildNodes({
      el: this,
      nodes: this.tree.createFromMultiple(this.children),
    });
    this.handleProps();

    return [this.node];
  }

  destroy() {
    this.children.forEach((c) => c.destroy());
    this.cleanups.forEach((c) => c());
    this.tree.renderer.dom.destroy({ el: this });
  }

  private handleProps() {
    for (const [key, value] of Object.entries(this.props)) {
      if (this.isEventProp(key)) {
        this.tree.renderer.dom.setEventListener({
          el: this,
          eventType: this.getEventTypeFromPropKey(key),
          eventListener: value,
        });
        continue;
      }
      this.setProp(key, value);
      if (isReactive(value)) {
        this.cleanups.add(
          value.subscribe(() => {
            this.setProp(key, value);
          })
        );
      }
    }
  }

  private setProp(key: string, value: any) {
    this.tree.renderer.dom.setProp({
      el: this,
      propKey: key,
      propValue: value,
    });
  }

  private getEventTypeFromPropKey(propKey: string) {
    return propKey.slice(2).toLowerCase();
  }

  private isEventProp = (propKey: string) =>
    propKey !== "on" && propKey.indexOf("on") === 0 && /[A-Z]/.test(propKey[2]);
}

type MintDOMElementArgs = {
  tag: string;
  props: object;
  children: MintElement[];
  tree: MintTree;
};
