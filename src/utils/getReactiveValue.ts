import { Reactive, isReactive } from "../reactive";

export const getReactiveValue = <T>(value: T | Reactive<T>) => {
  return isReactive(value) ? value.value : value;
};
