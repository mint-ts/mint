import { Reactive } from "../reactive";

export type MintReactiveProps<T> = {
  [key in keyof T]: T[key] | Reactive<T[key]>;
};
