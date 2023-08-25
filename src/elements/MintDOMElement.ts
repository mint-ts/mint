import { initElementsChildren } from "../utils";
import { CleanupFn, MintElement, MintParentElement } from "./types";

export class MintDOMElement {
  constructor({ tag, props, children }: MintDOMElementArgs) {
    this.tag = tag;
    this.props = props;
    this.children = children;

    initElementsChildren(this, ...this.children);
  }
  type = "dom" as const;
  tag;
  props;
  children;
  isInserted = false;
  dom: HTMLElement | undefined;
  index = 0;
  parent: MintParentElement | undefined;
  cleanups = new Set<CleanupFn>();
}

type MintDOMElementArgs = {
  tag: string;
  props: object;
  children: MintElement[];
};
