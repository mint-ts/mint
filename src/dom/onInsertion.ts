import { MintElement } from "../elements";
import { isParentElement } from "../utils";

/** Called when elements are inserted into the DOM */
export const onInsertion = (...els: MintElement[]) => {
  for (const el of els) {
    // @ts-ignore
    if (el.parent.type === "show" && el.parent.when.value === false) {
      // el.isMounted = true;
    } else {
      el.isInserted = true;
    }

    if (el.type === "component") {
      el.onMounts.forEach((cb: Function) => cb());
    }
    if (isParentElement(el)) {
      onInsertion(...el.children);
    }
  }
};
