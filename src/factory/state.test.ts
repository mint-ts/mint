import { expect, test } from "vitest";
import { State } from "../reactive";
import { state } from "./state";

test("state - creates a State instance and passes initial value", () => {
  const result = state(0);
  expect(result).toBeInstanceOf(State);
  expect(result.value).toBe(0);
});
