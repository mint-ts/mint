import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLObjectElementAttributes = {
  classID?: string | undefined;
  data?: string | undefined;
  form?: string | undefined;
  height?: number | string | undefined;
  name?: string | undefined;
  type?: string | undefined;
  useMap?: string | undefined;
  width?: number | string | undefined;
  wmode?: string | undefined;
};

export type HTMLObjectElementProps = MintHTMLElementProps<HTMLObjectElement> &
  MintReactiveProps<HTMLObjectElementAttributes>;
