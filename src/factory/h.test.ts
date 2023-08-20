import { expect, test } from "vitest";
import { h } from "./h";
import { MintDOMElement } from "../elements";

test("h - no props, no children", () => {
  const result = h.div();
  expect(result).toBeInstanceOf(MintDOMElement);
  expect(result.tag).toBe("div");
});

test("h - with props, no children", () => {
  const result = h.div({ id: "1" });
  expect(result).toBeInstanceOf(MintDOMElement);
  expect(result.tag).toBe("div");
  expect(result.props).toStrictEqual({ id: "1" });
  expect(result.children.length).toBe(0);
});

test("h - no props, with children", () => {
  const result = h.div(h.div());
  expect(result).toBeInstanceOf(MintDOMElement);
  expect(result.tag).toBe("div");
  expect(result.props).toStrictEqual({});
  expect(result.children.length).toBe(1);
});

test("h - with props, with children", () => {
  const result = h.div({ id: "1" }, h.div());
  expect(result).toBeInstanceOf(MintDOMElement);
  expect(result.tag).toBe("div");
  expect(result.props).toStrictEqual({ id: "1" });
  expect(result.children.length).toBe(1);
});
