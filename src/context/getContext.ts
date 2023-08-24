import { currentComponent } from "../currentComponent";
import { MintElement } from "../elements";
import { Context } from "./Context";

/** Looks for the nearest ancestor MintProviderElement with a matching context
 * and returns it's value.
 * @returns Value passed to provider
 */
export const getContext = <Value>(context: Context<Value>) => {
  const component = currentComponent.current;

  let current: MintElement | undefined = component;

  if (!current) return {} as Value;

  while (current) {
    if (current.type === "provider" && current.context === context) {
      return current.value as Value;
    }
    current = current.parent;

    if (!current) return {} as Value;
  }

  return {} as Value;
};
