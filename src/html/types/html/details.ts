import { MintReactiveProps } from "../../../core";
import { DomEventHandler } from "../events";
import { MintHTMLElementProps } from "./shared";

export type HTMLDetailsElementAttributes = {
  open?: boolean | undefined;
};

export type HTMLDetailsElementEvents = {
  onToggle?: DomEventHandler<HTMLDetailsElement> | undefined;
};

export type HTMLDetailsElementProps = MintHTMLElementProps<HTMLDetailsElement> &
  MintReactiveProps<HTMLDetailsElementAttributes> &
  HTMLDetailsElementEvents;
