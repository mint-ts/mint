import { REVERSE_EL_TYPE_MAP } from "../constants";
import { CoreElement } from "../types";
import { isObject } from "./isObject";

export const isCoreElement = (v: any): v is CoreElement => {
  return isObject(v) && (REVERSE_EL_TYPE_MAP as any)[v._type];
};
