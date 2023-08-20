import { Reactive } from "../types";
import { CleanupFn, MintParentElement } from "./types";

export class MintReactiveElement {
  constructor(reactive: Reactive) {
    this.reactive = reactive;
  }
  type = "reactive" as const;
  reactive;
  index = 0;
  parent: MintParentElement | undefined;
  isInserted = false;
  dom: Text | undefined;
  cleanups = new Set<CleanupFn>();
}
