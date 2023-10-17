import * as CSS from "csstype";
import { MintEventProps, MintNode } from "../../types";

export type CSSProperties = CSS.Properties<string | number>;

export type MintProps<T extends HTMLElement | SVGElement> = {
  c?: MintNode;
} & MintEventProps<T>;

export type Booleanish = boolean | "true" | "false";

export type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;
