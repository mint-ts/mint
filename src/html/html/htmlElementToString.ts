import { HtmlElement } from "..";
import { isEventProp } from "../../core";
import { elementsToString } from "./elToString";


const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};

export const styleObjToString = (styleObj: object) => {
  return Object.entries(styleObj)
    .map(([key, value]) => {
      let v = value;

      if (typeof v === "number") {
        v = `${v}px`;
      }

      return `${key.replace(
        /[A-Z]/g,
        (match) => `-${match.toLowerCase()}`
      )}:${v}`;
    })
    .join(";");
};
