import { expect, test } from "vitest";
import { h } from "../factory";
import { renderHTML } from "../html";

test("html - children", () => {
  expect(renderHTML(h.div())).toBe("<div/>");

  expect(renderHTML(h.div("1"))).toBe("<div>1</div>");

  expect(renderHTML(h.div("1", "2"))).toBe("<div>12</div>");

  expect(renderHTML(h.div(h.h1()))).toBe("<div><h1/></div>");

  expect(renderHTML(h.div(h.h1("1")))).toBe("<div><h1>1</h1></div>");
});

test("html - attribute", () => {
  expect(renderHTML(h.div({ id: "1" }))).toBe(`<div id="1"/>`);
});

test("html - style attribute", () => {
  expect(renderHTML(h.div({ style: { backgroundColor: "red" } }))).toBe(
    `<div style="background-color:red"/>`
  );

  expect(renderHTML(h.div({ style: { fontSize: 1 } }))).toBe(
    `<div style="font-size:1px"/>`
  );

  expect(
    renderHTML(h.div({ style: { backgroundColor: "red", fontSize: 1 } }))
  ).toBe(`<div style="background-color:red;font-size:1px"/>`);
});
