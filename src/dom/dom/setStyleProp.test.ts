// @vitest-environment jsdom

import { expect, test } from "vitest";
import { h } from "../../factory";
import { create } from "../create";
import { setStyleProp } from "./setStyleProp";

test("setStyleProp - string value", () => {
  const el = h.div();
  create(el);

  setStyleProp(el, { color: "white" });

  expect(el.dom?.style.color).toBe("white");
});

test("setStyleProp - numberValue", () => {
  const el = h.div();
  create(el);

  setStyleProp(el, { fontSize: 1 });
  expect(el.dom?.style.fontSize).toBe("1px");
});

test("setStyleProp - multiple props", () => {
  const el = h.div();
  create(el);

  setStyleProp(el, { color: "white", fontSize: 1 });

  expect(el.dom?.style.color).toBe("white");
  expect(el.dom?.style.fontSize).toBe("1px");
});

// TODO: test for resetting/clearing style props