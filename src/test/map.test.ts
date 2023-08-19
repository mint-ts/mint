// @vitest-environment jsdom

import { expect, test } from "vitest";
import { MintElement } from "../elements";
import { h, map, state } from "../factory";
import { State } from "../reactive";
import { render } from "../dom";

test("map", () => {
  const arr = state<Item[]>([]);
  const m = map(arr, () => h.div());

  render(m, document.createElement("div"));

  expect(m).toBeInstanceOf(MintElement);
  expect(m.type).toBe("list");
  expect(m.data.reactiveArray).toBeInstanceOf(State);
  expect(m.data.children).toStrictEqual([]);
  expect(m.data.children.length).toEqual(0);

  arr.value = [...arr.value, { test: "1" }];

  expect(m.data.children.length).toEqual(1);
  const firstChild = m.data.children[0];
  expect(firstChild).toBeInstanceOf(MintElement);
  expect(firstChild.type).toBe("dom");
  expect(firstChild.data.tag).toBe("div");
});

type Item = {
  test: string;
};
