import { MintProviderElement } from "../elements";
import { MintNode } from "../types";
import { filterNodes } from "../utils";

export class Context<Value = any> {
  /** Returns a MintProviderElement */
  provider(props: { value: Value }, ...children: MintNode[]) {
    return new MintProviderElement(props.value, filterNodes(...children), this);
  }
}

export const createContext = <Value>() => {
  return new Context<Value>();
};
