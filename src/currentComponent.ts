import { MintElement } from "./elements";

export const currentComponent = (() => {
  let current: MintElement | undefined = undefined;

  return {
    get current() {
      return current;
    },
    set current(currentComponent: MintElement | undefined) {
      current = currentComponent;
    },
  };
})();
