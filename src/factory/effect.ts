import { Reactive } from "../types";
import { onDestroy } from "./onDestroy";

export const effect = (reactives: Reactive[], run: () => any) => {
  const unsubs: (() => void)[] = [];

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
