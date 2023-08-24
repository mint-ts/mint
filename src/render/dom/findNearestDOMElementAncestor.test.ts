import { expect, test } from "vitest";
import { findNearestDOMElementAncestor } from "./findNearestDOMElementAncestor";
import { h, show, state } from "../../factory";

test("findDOMParent - direct", () => {
  const el = h.div();
  const parent = h.div();
  el.parent = parent;

  const result = findNearestDOMElementAncestor(el);
  expect(result).toBe(parent);
});

test("findDOMParent - nested", () => {
  const el = h.div();
  const parent = show(state(false), el);
  const domAncestor = h.div(parent);
  el.parent = parent;

  const result = findNearestDOMElementAncestor(el);
  expect(result).toBe(domAncestor);
});
