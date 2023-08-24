import { MintElement, MintParentElement } from "../elements";

export const isParentElement = (el: MintElement): el is MintParentElement => {
  return ["dom", "component", "provider", "show", "list"].includes(el.type);
};
