import { MintElement } from "../elements";
import { destroy } from "./destroy";

export const destroyMultiple = (...els: MintElement[]) => {
  els.forEach((el) => destroy(el));
};
