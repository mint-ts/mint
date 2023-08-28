import { expect, test } from "vitest";
import { DOMRenderer } from "../DOMRenderer";
import { HTMLELementDOMRenderer } from "../HTMLElementDOMRenderer";

test("getEventTypeFromPropKey - valid", () => {
  const htmlElementRenderer = new HTMLELementDOMRenderer(new DOMRenderer());

  expect(htmlElementRenderer.getEventTypeFromPropKey("onClick")).toBe("click");
});
