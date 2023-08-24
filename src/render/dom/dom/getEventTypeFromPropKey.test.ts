import { expect, test } from "vitest";
import { getEventTypeFromPropKey } from "./getEventTypeFromPropKey";

test("getEventTypeFromPropKey - valid", () => {
  expect(getEventTypeFromPropKey("onClick")).toBe("click");
});
