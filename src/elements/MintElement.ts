import { initElementsChildren } from "../utils";

export class MintElement {
  constructor(args: { type: MintElementType; data?: Record<string, any> }) {
    this.type = args.type;
    this.data = args.data ?? {};

    this.data.cleanUps = new Set();

    if (this.data.children) {
      initElementsChildren(this);
    }
    if (this.type === "component") {
      this.data.children = [];
      this.data.onMounts = new Set();
      this.data.onDestroys = new Set();
    }
  }
  type;
  parent: MintElement | undefined;
  index = 0;
  data;
}

export type MintElementType =
  | "dom"
  | "component"
  | "text"
  | "reactive"
  | "show"
  | "list"
  | "frag"
  | "provider";
