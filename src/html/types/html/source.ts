import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLSourceElementAttributes = {
  height?: number | string | undefined;
  media?: string | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLSourceElementProps = MintHTMLElementProps<HTMLSourceElement> &
  MintReactiveProps<HTMLSourceElementAttributes>;
