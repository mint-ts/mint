import { expect, test } from "vitest";
import { MintShowElement } from "../elements";
import { h } from "./h";
import { show } from "./show";
import { state } from "./state";

test("show creates an instance of MintShowElement and passes args", () => {
  const reactive = state(false);
  const child = h.div();
  const result = show(reactive, child);
  expect(result).toBeInstanceOf(MintShowElement);
  expect(result.when).toBe(reactive);
  expect(result.children.length).toBe(1);
  expect(result.children[0]).toBe(child);
});
