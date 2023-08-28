import { MintTree } from "../MintTree";
import { currentComponent } from "../currentComponent";
import { MintNode } from "../types";
import { initElementsChildren } from "../utils";
import {
  CleanupFn,
  MintElement,
  MintElementLifecycle,
  MintParentElement,
} from "./types";

export class MintComponentElement implements MintElementLifecycle {
  constructor({ render, props, tree }: MintComponentElementArgs) {
    this.render = render;
    this.props = props;
    this.tree = tree;
  }
  type = "component" as const;
  render;
  props;
  tree;
  children: MintElement[] = [];
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
  onMounts = new Set<OnMountCallback>();
  onDestroys = new Set<OnDestroyCallback>();

  getNodes() {
    return this.tree.getNodes(...this.children);
  }

  create() {
    currentComponent.current = this;
    const elements = this.tree.nodesToElements(this.render(this.props));
    currentComponent.current = undefined;
    initElementsChildren(this, ...elements);
    this.children = elements;

    return [];
  }

  destroy() {
    this.onMounts.clear();
    this.onDestroys.forEach((cb) => cb());
    this.onDestroys.clear();
  }
}

type OnMountCallback = () => void;
type OnDestroyCallback = () => void;

export type MintComponentElementArgs = {
  render: (props: any) => MintNode;
  props: object;
  tree: MintTree;
};
