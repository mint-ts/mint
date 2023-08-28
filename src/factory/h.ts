import { MintElementValue } from "../elements";
import { HTMLElementPropMap } from "../types";

type Props<Tag extends keyof HTMLElementPropMap> = HTMLElementPropMap[Tag];

const f =
  <Tag extends keyof HTMLElementPropMap>(tag: Tag) =>
  ({ children, ...props }: Props<Tag>) =>
    new MintElementValue("dom", {
      tag,
      props,
      children: Array.isArray(children) ? children : [children],
    });

export const h = {
  div: f("div"),
  h1: f("h1"),
  h2: f("h2"),
  h3: f("h3"),
  h4: f("h4"),
  h5: f("h5"),
  h6: f("h6"),
  button: f("button"),
  ul: f("ul"),
  li: f("li"),
  form: f("form"),
  input: f("input"),
  label: f("label"),
  header: f("header"),
  a: f("a"),
  select: f("select"),
  option: f("option"),
  textarea: f("textarea"),
  main: f("main"),
};
