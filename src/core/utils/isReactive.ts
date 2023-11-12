import { Reactive } from "../reactive";
import { isCoreObjectOfType } from "./isCoreObjectOfType";

export const isReactive = (v: any): v is Reactive<any> => {
  return isCoreObjectOfType(v, "state") || isCoreObjectOfType(v, "computed");
};
