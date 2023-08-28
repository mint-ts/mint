import { expect, test } from "vitest";
import { h, show, state } from "../../../factory";
import { DOMRenderer } from "../DOMRenderer";

test("findDOMParent - direct", () => {
  const el = h.div();
  const renderer = new DOMRenderer();
  const parent = h.div();
  el.parent = parent;

  const result = renderer.findNearestDOMElementAncestor(el);
  expect(result).toBe(parent);
});

test("findDOMParent - nested", () => {
  const el = h.div();
  const renderer = new DOMRenderer();
  const parent = show(state(false), el);
  const domAncestor = h.div(parent);
  el.parent = parent;

  const result = renderer.findNearestDOMElementAncestor(el);
  expect(result).toBe(domAncestor);
});
