import { MintComponentElement } from "./MintComponentElement";
import { MintDOMElement } from "./MintDOMElement";
import { MintListElement } from "./MintListElement";
import { MintProviderElement } from "./MintProviderElement";
import { MintReactiveElement } from "./MintReactiveElement";
import { MintShowElement } from "./MintShowElement";
import { MintTextElement } from "./MintTextElement";

export type MintElement =
  | MintDOMElement
  | MintShowElement
  | MintListElement
  | MintComponentElement
  | MintProviderElement
  | MintTextElement
  | MintReactiveElement;

export type MintParentElement =
  | MintDOMElement
  | MintShowElement
  | MintListElement
  | MintComponentElement
  | MintProviderElement;

export type CleanupFn = () => void;

export interface MintElementLifecycle {
  create(): any[];
  getNodes(): any[];
  destroy(): void;
}
