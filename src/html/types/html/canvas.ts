import { MintReactiveProps } from "../../../core";
import { MintHTMLElementProps } from "./shared";

export type HTMLCanvasElementAttributes = {
  height?: number | string | undefined;
  width?: number | string | undefined;
};

export type HTMLCanvasElementProps = MintHTMLElementProps<HTMLCanvasElement> &
  MintReactiveProps<HTMLCanvasElementAttributes>;
