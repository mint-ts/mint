import { Computed } from "../reactive";
import { Reactive } from "../types";

export const computed = <Value>(
  reactives: Reactive[],
  compute: () => Value
) => {
  return new Computed(reactives, compute);
};
