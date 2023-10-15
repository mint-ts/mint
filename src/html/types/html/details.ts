import { MintEventHandler } from "../../../types";
import { MintHTMLElementProps } from "./shared";

export type HTMLDetailsElementAttributes = {
  open?: boolean | undefined;
};

export type HTMLDetailsElementEvents = {
  onToggle?: MintEventHandler<HTMLDetailsElement> | undefined;
};

export type HTMLDetailsElementProps = MintHTMLElementProps<HTMLDetailsElement> &
  HTMLDetailsElementAttributes &
  HTMLDetailsElementEvents;
