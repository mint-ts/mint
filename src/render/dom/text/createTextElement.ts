import { MintTextElement } from "../../../elements";

export const createTextElement = (el: MintTextElement) => {
  const text = new Text(el.text);
  el.dom = text;
  return [text];
};
