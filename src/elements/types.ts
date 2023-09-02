import { MintRenderer } from "../render";
import { MintComponentElement } from "./MintComponentElement";
import { MintHTMLElement } from "./MintHTMLElement";
import { MintListElement } from "./MintListElement";
import { MintProviderElement } from "./MintProviderElement";
import { MintReactiveElement } from "./MintReactiveElement";
import { MintShowElement } from "./MintShowElement";
import { MintTextElement } from "./MintTextElement";

export type MintElement<Node = any> =
  | MintHTMLElement<Node>
  | MintShowElement<Node>
  | MintListElement<Node>
  | MintComponentElement<Node>
  | MintProviderElement<Node>
  | MintTextElement<Node>
  | MintReactiveElement<Node>;

export type MintParentElement =
  | MintHTMLElement
  | MintShowElement
  | MintListElement
  | MintComponentElement
  | MintProviderElement;

export type CleanupFn = () => void;

export interface MintElementContract<Node = any> {
  create(): Node[];
  getNodes(): Node[];
  onInsertion(): void;
  destroy(): void;
}
