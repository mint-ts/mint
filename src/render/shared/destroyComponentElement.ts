import { MintComponentElement } from "../../elements";

export const destroyComponentElement = (el: MintComponentElement) => {
  el.onMounts.clear();
  el.onDestroys.forEach((cb) => cb());
  el.onDestroys.clear();
};
