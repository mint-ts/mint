import { MintElement } from "../elements";
import { HTMLElementPropMap, MintNode } from "../types";
import { filterNodes } from "../utils";

type Factory<Tag extends keyof HTMLElementPropMap> = {
  /** Factory function for creating a MintElement of type DOM */
  (props: Props<Tag>, ...children: MintNode[]): MintElement;
  /** Factory function for creating a MintElement of type DOM */
  (...children: MintNode[]): MintElement;
};

type Props<Tag extends keyof HTMLElementPropMap> = HTMLElementPropMap[Tag];

const f = <Tag extends keyof HTMLElementPropMap>(tag: Tag) => {
  const factory: Factory<Tag> = (propsOrChild: any, ...children: any[]) => {
    let props = {};
    let _children = [...children];

    if (
      typeof propsOrChild === "object" &&
      propsOrChild.constructor === Object
    ) {
      props = propsOrChild;
    } else {
      _children = [propsOrChild, ...children];
    }

    return new MintElement({
      type: "dom",
      data: {
        tag,
        props,
        children: filterNodes(..._children),
      },
    });
  };
  return factory;
};

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
};
