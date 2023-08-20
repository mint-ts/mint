import { State } from "../reactive";

/** Used for creating a writable Reactive object.
 * @returns State
 */
export const state = <Value>(initialValue: Value) => {
  return new State(initialValue);
};
