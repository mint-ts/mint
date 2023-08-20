import { MintComponentElement } from "../../elements";
import { destroyMultiple } from "../destroyMultiple";

export const destroyComponentElement = (el: MintComponentElement) => {
  destroyMultiple(...el.children);
  el.onMounts.clear();
  el.onDestroys.forEach((cb: Function) => cb());
  el.onDestroys.clear();
};
