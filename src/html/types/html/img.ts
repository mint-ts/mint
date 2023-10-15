import { CrossOrigin, MintReactiveProps } from "../shared";
import { HTMLAttributeReferrerPolicy, MintHTMLElementProps } from "./shared";

export type HTMLImageElementAttributes = {
  alt?: string | undefined;
  crossOrigin?: CrossOrigin;
  decoding?: "async" | "auto" | "sync" | undefined;
  height?: number | string | undefined;
  loading?: "eager" | "lazy" | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  useMap?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLImageElementProps = MintHTMLElementProps<HTMLImageElement> &
  MintReactiveProps<HTMLImageElementAttributes>;
