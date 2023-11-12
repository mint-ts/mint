import * as CSS from "csstype";
import { MintNode } from "../../core";
import { DomEventProps } from "./events";

export type CSSProperties = CSS.Properties<string | number>;

export type MintDomProps<T extends HTMLElement | SVGElement> = {
  node?: MintNode;
  use?: UseFn<T> | UseFn<T>[];
} & DomEventProps<T>;

export type Booleanish = boolean | "true" | "false";

export type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

export type UseFn<T extends HTMLElement | SVGElement> = (
  node: T
) => (() => void) | void;
