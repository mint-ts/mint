// @vitest-environment jsdom

import { expect, test } from "vitest";
import { h } from "../../../factory";
import { createDOMElement } from "./createDOMElement";

test("createDOMElement - no props, no children", () => {
  const domNodes = createDOMElement(h.div());
  const domNode = domNodes[0];

  expect(domNode).toBeInstanceOf(HTMLDivElement);
});

test("createDOMElement - with props", () => {
  const domNodes = createDOMElement(h.div({ id: "1" }));
  const domNode = domNodes[0];

  expect(domNode).toBeInstanceOf(HTMLDivElement);
  expect(domNode.id).toBe("1");
});
