import { MintComponentElement } from "./elements";

export const currentComponent = (() => {
  let current: MintComponentElement | undefined = undefined;

  return {
    get current() {
      return current;
    },
    set current(currentComponent: MintComponentElement | undefined) {
      current = currentComponent;
    },
  };
})();
