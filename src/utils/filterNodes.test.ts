import { expect, test } from "vitest";
import { MintDOMElement, MintTextElement } from "../elements";
import { h } from "../factory";
import { filterNodes } from "./filterNodes";

test("filterNodes - string to a MintTextElement", () => {
  const els = filterNodes("");

  expect(els[0]).toBeInstanceOf(MintTextElement);
});

test("filterNodes - number to a MintTextElement", () => {
  const els = filterNodes(1, NaN);

  expect(els[0]).toBeInstanceOf(MintTextElement);
  expect(els[1]).toBeInstanceOf(MintTextElement);
});

test("filterNodes - boolean|null|undefined are ignored", () => {
  const els = filterNodes(false, null, undefined);

  expect(els).toStrictEqual([]);
});

test("filterNodes - a MintElement is returned as is", () => {
  const els = filterNodes(h.div());

  expect(els[0]).toBeInstanceOf(MintDOMElement);
});

test("filterNodes - returns a flat array of elements", () => {
  const els = filterNodes([h.div()], [false], ["", [1]]);

  expect(els.length).toBe(3);
  expect(els[0]).toBeInstanceOf(MintDOMElement);
  expect(els[1]).toBeInstanceOf(MintTextElement);
  expect(els[2]).toBeInstanceOf(MintTextElement);
});
