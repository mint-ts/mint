import { Computed } from "../reactive";
import { Reactive } from "../types";

/** Used for creating a computed/derived Reactive object.
 * @returs Computed
 */
export const computed = <Value>(
  reactives: Reactive[],
  compute: () => Value
) => {
  return new Computed(reactives, compute);
};
