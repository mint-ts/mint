import { TextElementHTMLNode } from "../render";
import { CleanupFn, MintParentElement } from "./types";

export class MintTextElement {
  constructor(text: string) {
    this.text = text;
  }
  type = "text" as const;
  text;
  index = 0;
  parent: MintParentElement | undefined;
  dom: Text | undefined;
  htmlNode: TextElementHTMLNode | undefined;
  isInserted = false;
  cleanups = new Set<CleanupFn>();
}
