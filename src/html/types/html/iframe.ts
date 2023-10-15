import { MintReactiveProps } from "../shared";
import { HTMLAttributeReferrerPolicy, MintHTMLElementProps } from "./shared";

export type HTMLIFrameElementAttributes = {
  allow?: string | undefined;
  allowFullScreen?: boolean | undefined;
  allowTransparency?: boolean | undefined;
  /** @deprecated */
  frameBorder?: number | string | undefined;
  height?: number | string | undefined;
  loading?: "eager" | "lazy" | undefined;
  /** @deprecated */
  marginHeight?: number | undefined;
  /** @deprecated */
  marginWidth?: number | undefined;
  name?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sandbox?: string | undefined;
  /** @deprecated */
  scrolling?: string | undefined;
  seamless?: boolean | undefined;
  src?: string | undefined;
  srcDoc?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLIFrameElementProps = MintHTMLElementProps<HTMLIFrameElement> &
  MintReactiveProps<HTMLIFrameElementAttributes>;
