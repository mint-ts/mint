import { expect, expectTypeOf, test } from "vitest";
import { MintProviderElement } from "../elements";
import { h } from "../factory";
import { Context, createContext } from "./Context";

test("createContext - creates an instance of Context", () => {
  const result = createContext();
  expect(result).toBeInstanceOf(Context);
});

test("Context - has the right methods/shape", () => {
  const result = new Context();
  expectTypeOf(result.provider).toBeFunction();
});

test("Context.provider - returns a MintProviderElement and passes args", () => {
  const context = new Context();
  const value = "1";
  const child = h.div();
  const result = context.provider({ value }, child);
  expect(result).toBeInstanceOf(MintProviderElement);
  expect(result.value).toBe(value);
  expect(result.children.length).toBe(1);
  expect(result.children[0]).toBe(child);
});
