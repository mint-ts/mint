import { expect, test } from "vitest";
import { getStyleStringFromStyleObject } from "./getStyleStringFromStyleObject";

test("getStyleStringFromStyleObject - single lowercase", () => {
  const result = getStyleStringFromStyleObject({ color: "white" });
  expect(result).toBe("color:white");
});

test("getStyleStringFromStyleObject - single camelCase", () => {
  const result = getStyleStringFromStyleObject({ backgroundColor: "red" });
  expect(result).toBe("background-color:red");
});

test("getStyleStringFromStyleObject - single number value", () => {
  const result = getStyleStringFromStyleObject({ fontSize: 1 });
  expect(result).toBe("font-size:1px");
});

test("getStyleStringFromStyleObject - multiple", () => {
  const result = getStyleStringFromStyleObject({
    color: "white",
    backgroundColor: "red",
    fontSize: 1,
  });
  expect(result).toBe("color:white;background-color:red;font-size:1px");
});
