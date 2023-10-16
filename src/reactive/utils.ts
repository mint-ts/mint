import { isObject } from "../utils";
import { Reactive } from "./types";

export const isReactive = (v: any): v is Reactive<any> => {
  return isObject(v) && typeMap[v._type];
};

export const isComputed = (v: any) => {
  return isObject(v) && v._type === COMPUTED_TYPE;
};

export const STATE_TYPE = "mint_state";
export const COMPUTED_TYPE = "mint_computed";

const typeMap: any = {
  [STATE_TYPE]: 1,
  [COMPUTED_TYPE]: 1,
};
