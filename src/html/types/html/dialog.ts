import { MintEventHandler } from "../../../types";
import { MintHTMLElementProps } from "./shared";

export type HTMLDialogElementAttributes = {
  open?: boolean | undefined;
};

export type HTMLDialogElementEvents = {
  onCancel?: MintEventHandler<HTMLDialogElement> | undefined;
  onClose?: MintEventHandler<HTMLDialogElement> | undefined;
};

export type HTMLDialogElementProps = MintHTMLElementProps<HTMLDialogElement> &
  HTMLDialogElementAttributes &
  HTMLDialogElementEvents;
