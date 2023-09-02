import * as CSS from "csstype";
import { MintNode } from "./elements";
import { MintEventProps } from "./events";
import { Reactive } from "./reactive";

export type MintProp<T> = T | Reactive<T>;

export type HTMLAttributes = {
  id?: MintProp<string>;
  className?: MintProp<string>;
  style?: MintProp<CSSProperties>;
  children?: MintNode;
  [key: string]: any;
};

export type MintCommonProps<T extends HTMLElement> = HTMLAttributes &
  MintEventProps<T>;

export type MintPropify<T> = {
  [Key in keyof T]: MintProp<T[Key]>;
};

export type CSSProperties = CSS.Properties<string | number>;
