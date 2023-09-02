import { MintElementValue, MintProviderElement } from "../elements";
import { MintNode } from "../types";

export class Context<Value = any> {
  /** Returns a MintProviderElement */
  provider(props: { value: Value }, ...children: MintNode[]): MintElementValue {
    const inst = this;
    return {
      toMintElement(renderer) {
        return new MintProviderElement(
          props.value,
          renderer.nodesToElements(children),
          inst,
          renderer
        );
      },
    };
  }
}

export const createContext = <Value>() => {
  return new Context<Value>();
};
