import { MintElement } from "../elements";
import { MintNode } from "../types";
import { filterNodes } from "../utils";

export class Context<Value = any> {
  /** Returns a MintProviderElement */
  provider(props: { value: Value }, ...children: MintNode[]) {
    return new MintElement({
      type: "provider",
      data: {
        value: props.value,
        children: filterNodes(...children),
        context: this,
      },
    });
  }
}

export const createContext = <Value>() => {
  return new Context<Value>();
};
