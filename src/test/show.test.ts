import { expect, expectTypeOf, test } from "vitest";
import { MintElement } from "../elements";
import { h, show, state } from "../factory";
import { State } from "../reactive";
// @vitest-environment jsdom

import { render } from "../dom";

test("show", () => {
  const s = state(false);
  const el = show(s, h.div());

  render(el, document.createElement("div"));

  expect(el).toBeInstanceOf(MintElement);
  expect(el.type).toBe("show");
  expect(el.data.reactive).toBeInstanceOf(State);
  expect(el.data.reactive.value).toBe(false);
  expectTypeOf(el.data.children).toBeArray();
  expect(el.data.children.length).toBe(1);

  const firstChild = el.data.children[0];

  // child element is not rendered initially because of false condition
  expect(firstChild.data.dom).toBe(undefined);

  s.value = true;

  expect(el.data.reactive.value).toBe(true);

  // child element is rendered after condition changes to true
  expect(firstChild.data.dom).toBeInstanceOf(HTMLElement);
});
