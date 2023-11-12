import { isObject } from "./isObject";

export const isPromise = <Value>(v: any): v is Promise<Value> => {
  return isObject(v) && "then" in v && typeof v.then === "function";
};
