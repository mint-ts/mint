import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLEmbedElementAttributes = {
  height?: number | string | undefined;
  src?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLEmbedElementProps = MintHTMLElementProps<HTMLEmbedElement> &
  MintReactiveProps<HTMLEmbedElementAttributes>;
