import { currentComponent } from "../currentComponent";
import { MintRenderer } from "../render";
import { MintNode } from "../types";
import { initElementsChildren } from "../utils";
import {
  CleanupFn,
  MintElement,
  MintElementContract,
  MintParentElement,
} from "./types";

export class MintComponentElement<Node = any>
  implements MintElementContract<Node>
{
  constructor(
    render: (props: any) => MintNode,
    props: object,
    renderer: MintRenderer<Node>
  ) {
    this.render = render;
    this.props = props;
    this.renderer = renderer;
  }
  type = "component" as const;
  render;
  props;
  renderer;
  children: MintElement[] = [];
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
  onMounts = new Set<OnMountCallback>();
  onDestroys = new Set<OnDestroyCallback>();

  getNodes(): Node[] {
    return this.renderer.getNodes(...this.children);
  }

  create(): Node[] {
    currentComponent.current = this;
    const elements = this.renderer.nodesToElements(this.render(this.props));
    currentComponent.current = undefined;
    initElementsChildren(this, ...elements);
    this.children = elements;

    return this.renderer.createFromMultiple(this.children);
  }

  onInsertion(): void {}

  destroy() {
    this.onMounts.clear();
    this.onDestroys.forEach((cb) => cb());
    this.onDestroys.clear();
  }
}

type OnMountCallback = () => void;
type OnDestroyCallback = () => void;
