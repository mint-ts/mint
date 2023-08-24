import { UnsubscribeFn } from "../reactive";
import { Reactive } from "../types";
import { onDestroy } from "./onDestroy";

/** Used for running a callback when one of the passed Reactives' values change.*/
export const effect = (reactives: Reactive[], run: () => any) => {
  const unsubs: UnsubscribeFn[] = [];

  reactives.forEach((r) => {
    unsubs.push(
      r.subscribe(() => {
        run();
      })
    );
  });

  onDestroy(() => {
    unsubs.forEach((u) => u());
  });
};
