import { currentComponent } from "../currentComponent";
import { MintElement } from "../elements";
import { Context } from "./Context";

/** Looks for the nearest MintProviderElement with a matching context
 * and returns it's value
 */
export const getContext = <Value>(context: Context<Value>) => {
  const component = currentComponent.current;

  let current: MintElement | undefined = component;

  if (!current) return {} as Value;

  while (current) {
    if (current.type === "provider" && current.data.context === context) {
      return current.data.value as Value;
    }
    current = current.parent;

    if (!current) return {} as Value;
  }

  return {} as Value;
};
