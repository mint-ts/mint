import { CrossOrigin } from "../shared";
import { HTMLAttributeReferrerPolicy, MintHTMLAttributes } from "./shared";

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

export type HTMLImageElementProps = MintHTMLAttributes<HTMLImageElement> &
  HTMLImageElementAttributes;
