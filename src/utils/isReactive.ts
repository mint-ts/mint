import { Computed, State } from "../reactive";
import { Reactive } from "../types";

export const isReactive = (value: any): value is Reactive => {
  return value instanceof State || value instanceof Computed;
};
