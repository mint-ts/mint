import { MintReactiveProps } from "../../../types";
import { MintHTMLElementProps } from "./shared";

export type HTMLBaseElementAttributes = {
  href?: string | undefined;
  target?: string | undefined;
};

export type HTMLBaseElementProps = MintHTMLElementProps<HTMLBaseElement> &
  MintReactiveProps<HTMLBaseElementAttributes>;
