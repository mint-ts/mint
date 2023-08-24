import { expect, test } from "vitest";
import { isEventProp } from "./isEventProp";

test("isEventProp - starts with on and uppercase char after", () => {
  expect(isEventProp("onClick")).toBe(true);
  expect(isEventProp("onMouseDown")).toBe(true);
});

test("isEventProp - starts with on but lowercase char after", () => {
  expect(isEventProp("onclick")).toBe(false);
});

test("isEventProp - doesn't start with on", () => {
  expect(isEventProp("id")).toBe(false);
});

test("isEventProp - exactly on", () => {
  expect(isEventProp("on")).toBe(false);
});
