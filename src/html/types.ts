import { MintElement } from "../elements";

export interface IHtmlAPI<T = MintElement> {
  create(el: T): string[];
  getFirstMountedNode(el: T): string | undefined;
  getAllMountedNodes(el: T): string[];
  destroy(el: T): void;
}
