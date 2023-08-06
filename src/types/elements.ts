import { MintElement } from "../elements";
import { Reactive } from "./reactive";

export type MintEmptyNode = boolean | null | undefined;

export type MintTextNode = string | number;

export type MintNode =
  | MintEmptyNode
  | MintTextNode
  | Reactive
  | MintElement
  | MintNode[];
