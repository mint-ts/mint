import { expect, expectTypeOf, test } from "vitest";
import { MintElement } from "../elements";
import { computed, h, map, show, state } from "../factory";
import { State } from "../reactive";

test("computed", () => {
  const c = computed([], () => 1);

  expect(c.value).toBe(1);
  expect(c.subscribe).toBeTypeOf("function");
});

test("state", () => {
  const s = state(1);

  expect(s.value).toBe(1);
  expectTypeOf(s.subscribe).toBeFunction();
});

test("show", () => {
  const s = state(false);
  const el = show(s, h.div());

  expect(el).toBeInstanceOf(MintElement);
  expect(el.type).toBe("show");
  expect(el.data.reactive).toBeInstanceOf(State);
  expect(el.data.reactive.value).toBe(false);
  s.value = true;
  expect(el.data.reactive.value).toBe(true);
  expectTypeOf(el.data.children).toBeArray();
  expect(el.data.children.length).toBe(1);
});

type Item = {
  test: string;
};

test("map", () => {
  const arr = state<Item[]>([]);
  const m = map(arr, () => h.div());

  expect(m).toBeInstanceOf(MintElement);
  expect(m.type).toBe("list");
  expect(m.data.reactiveArray).toBeInstanceOf(State);
  expect(m.data.children).toStrictEqual([]);
  console.log(m.data.children);
});

test("h", () => {
  const div = h.div();

  expect(div).toBeInstanceOf(MintElement);
  expect(div.type).toBe("dom");
  expect(div.data.tag).toBe("div");
  expect(div.data.props).toStrictEqual({});
  expect(div.data.children).toStrictEqual([]);

  const btn = h.button({ onClick: () => {} });

  expect(btn).toBeInstanceOf(MintElement);
  expect(btn.type).toBe("dom");
  expect(btn.data.tag).toBe("button");
  expect(btn.data.props).toHaveProperty("onClick");
  expectTypeOf(btn.data.props.onClick).toBeFunction();
});
