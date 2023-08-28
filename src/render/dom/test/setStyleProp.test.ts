// @vitest-environment jsdom

import { expect, test } from "vitest";
import { h } from "../../../factory";
import { DOMRenderer } from "../DOMRenderer";
import { HTMLELementDOMRenderer } from "../HTMLElementDOMRenderer";

test("setStyleProp - string value", () => {
  const el = h.div();
  const renderer = new DOMRenderer();
  const htmlElRenderer = new HTMLELementDOMRenderer(renderer);
  const container = document.createElement("div");
  renderer.render(el, container);

  htmlElRenderer.setStyleProp(el, { color: "white" });

  expect(el.dom?.style.color).toBe("white");
});

test("setStyleProp - numberValue", () => {
  const el = h.div();
  const renderer = new DOMRenderer();
  const htmlElRenderer = new HTMLELementDOMRenderer(renderer);
  const container = document.createElement("div");
  renderer.render(el, container);

  htmlElRenderer.setStyleProp(el, { fontSize: 1 });
  expect(el.dom?.style.fontSize).toBe("1px");
});

test("setStyleProp - multiple props", () => {
  const el = h.div();
  const renderer = new DOMRenderer();
  const htmlElRenderer = new HTMLELementDOMRenderer(renderer);
  const container = document.createElement("div");
  renderer.render(el, container);

  htmlElRenderer.setStyleProp(el, { color: "white", fontSize: 1 });

  expect(el.dom?.style.color).toBe("white");
  expect(el.dom?.style.fontSize).toBe("1px");
});

// TODO: test for resetting/clearing style props
