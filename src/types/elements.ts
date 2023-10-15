import { ElementFactory, MintElementCoreWorksWith } from "../core";
import { Reactive } from "../reactive";

/** Basic contract for all mint elements */
export type MintElement = {
  index: number;
  parent?: MintElementCoreWorksWith<any>;
  dispose?: Function;
};

/** Nodes which are ignored ( not rendered ) */
export type MintEmptyNode = boolean | null | undefined;

/** Nodes which are rendered as text */
export type MintTextNode = string | number;

export type MintNode =
  | MintEmptyNode
  | MintTextNode
  | ElementFactory<any>
  | Reactive<any>
  | MintNode[];
