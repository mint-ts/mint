import { expect, expectTypeOf, test } from "vitest";
import { state } from "../factory";
import { State } from "../reactive";

test("state", () => {
  const s = state(1);

  expect(s.value).toBe(1);
  expect(s).toBeInstanceOf(State);
  expectTypeOf(s.subscribe).toBeFunction();
});
