import { ElementFactory, ProviderElement } from "./elements";
import { MintNode } from "./types";

export class Context<Value> {
  provider(props: ContextProviderProps<Value>) {
    return new ElementFactory(
      (api) =>
        new ProviderElement(
          this,
          props.value,
          api.createElements(props.node),
          api
        )
    );
  }
}

export type ContextProviderProps<Value> = {
  value: Value;
  node?: MintNode;
};

export const createContext = <Value>() => {
  return new Context<Value>();
};
