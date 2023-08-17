import { MintElement } from "../elements";
import { Reactive } from "./reactive";

/** Nodes which are ignored ( not rendered ) */
export type MintEmptyNode = boolean | null | undefined;

/** Nodes which are rendered as text */
export type MintTextNode = string | number;

export type MintNode =
  | MintEmptyNode
  | MintTextNode
  | Reactive
  | MintElement
  | MintNode[];
