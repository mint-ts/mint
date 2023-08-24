import { Computed } from "../reactive";
import { Reactive } from "../types";

/** Used for creating a Reactive object with a computed/derived value.
 * @returs Computed
 */
export const computed = <Value>(
  reactives: Reactive[],
  compute: () => Value
) => {
  return new Computed(reactives, compute);
};
