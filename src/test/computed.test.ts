import { expect, test } from "vitest";
import { computed, state } from "../factory";
import { Computed } from "../reactive";

test("computed", () => {
  const count = state(1);
  const doubleCount = computed([count], () => count.value * 2);

  expect(doubleCount).toBeInstanceOf(Computed);
  expect(doubleCount.value).toBe(2);
  expect(doubleCount.subscribe).toBeTypeOf("function");

  count.value += 1;

  expect(doubleCount.value).toBe(4);
});
