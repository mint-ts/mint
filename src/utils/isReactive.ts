import { Computed, State } from "../reactive";

export const isReactive = (
  value: any
): value is State<any> | Computed<any> => {
  return value instanceof State || value instanceof Computed;
};
