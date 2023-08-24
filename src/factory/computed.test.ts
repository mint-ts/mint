import { expect, test } from "vitest";
import { Computed } from "../reactive";
import { computed } from "./computed";

test("computed - creates a Computed instance", () => {
  expect(computed([], () => {})).toBeInstanceOf(Computed);
});
