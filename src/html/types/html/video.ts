import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLVideElementAttributes = {
  height?: number | string | undefined;
  playsInline?: boolean | undefined;
  poster?: string | undefined;
  width?: number | string | undefined;
  disablePictureInPicture?: boolean | undefined;
  disableRemotePlayback?: boolean | undefined;
};

export type HTMLVideoElementProps = MintHTMLElementProps<HTMLVideoElement> &
  MintReactiveProps<HTMLVideElementAttributes>;
