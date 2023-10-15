import { MintNode } from "../types";
import { createElementFactory } from "./createElementFactory";
import { MintProviderElement, createProviderElement } from "./elements";

export class Context<Value> {
  provider(props: ContextProviderProps<Value>) {
    return createElementFactory<MintProviderElement<Value>>((core) =>
      createProviderElement(
        props.value,
        this,
        core.createElements(props.children)
      )
    );
  }
}

export type ContextProviderProps<Value> = {
  value: Value;
  children?: MintNode;
};

export const createContext = <Value>() => {
  return new Context<Value>();
};
