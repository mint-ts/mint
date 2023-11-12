import { MintReactiveProps } from "../../../core";
import { DomEventHandler } from "../events";
import { MintHTMLElementProps } from "./shared";

export type HTMLDialogElementAttributes = {
  open?: boolean | undefined;
};

export type HTMLDialogElementEvents = {
  onCancel?: DomEventHandler<HTMLDialogElement> | undefined;
  onClose?: DomEventHandler<HTMLDialogElement> | undefined;
};

export type HTMLDialogElementProps = MintHTMLElementProps<HTMLDialogElement> &
  MintReactiveProps<HTMLDialogElementAttributes> &
  HTMLDialogElementEvents;
