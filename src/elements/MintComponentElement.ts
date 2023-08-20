import { MintNode } from "../types";
import { CleanupFn, MintElement, MintParentElement } from "./types";

export class MintComponentElement {
  constructor(render: (props: any) => MintNode, props: object) {
    this.render = render;
    this.props = props;
  }
  type = "component" as const;
  render;
  props;
  children: MintElement[] = [];
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
  onMounts = new Set<OnMountCallback>();
  onDestroys = new Set<OnDestroyCallback>();
}

type OnMountCallback = () => void;
type OnDestroyCallback = () => void;
