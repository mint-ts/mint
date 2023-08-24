import { Reactive } from "../types";
import { isReactive } from "./isReactive";

export const getReactiveValue = <T>(value: T | Reactive<T>) => {
  return isReactive(value) ? value.value : value;
};
