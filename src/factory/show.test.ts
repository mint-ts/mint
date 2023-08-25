import { expect, test } from "vitest";
import { MintShowElement } from "../elements";
import { h } from "./h";
import { show } from "./show";
import { state } from "./state";

test("show - just yes", () => {
  const reactive = state(false);
  const child = h.div();
  const result = show(reactive, child);
  expect(result).toBeInstanceOf(MintShowElement);
  expect(result.when).toBe(reactive);
  expect(result.children.length).toBe(0);
  expect(result.notShownChildren.length).toBe(1);
  expect(result.notShownChildren[0]).toBe(child);
});

test("show - yes and no", () => {
  const reactive = state(false);
  const yesChild = h.div();
  const noChild1 = h.div();
  const result = show(reactive, yesChild, [noChild1, h.div()]);
  expect(result).toBeInstanceOf(MintShowElement);
  expect(result.when).toBe(reactive);
  expect(result.children.length).toBe(2);
  expect(result.notShownChildren.length).toBe(1);
  expect(result.notShownChildren[0]).toBe(yesChild);
});
