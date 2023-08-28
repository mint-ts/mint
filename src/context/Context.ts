import { MintElementValue } from "../elements";
import { MintNode } from "../types";

export class Context<Value = any> {
  /** Returns a MintProviderElement */
  provider(props: { value: Value }, ...children: MintNode[]) {
    return new MintElementValue("provider", {
      value: props.value,
      children,
      context: this,
    });
  }
}

export const createContext = <Value>() => {
  return new Context<Value>();
};
