import { expect, expectTypeOf, test } from "vitest";
import { MintElement } from "../elements";
import { h } from "../factory";

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
