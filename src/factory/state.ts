import { State } from "../reactive";

export const state = <Value>(initialValue: Value) => {
  return new State(initialValue);
};
