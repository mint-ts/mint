import { State } from "../reactive";

/** Used for creating a Reactive object with a writable value.
 * @returns State
 */
export const state = <Value>(initialValue: Value) => {
  return new State(initialValue);
};
