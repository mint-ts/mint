import { MintElementValue, MintHTMLElement } from "../elements";
import { HTMLElementRenderer, MintRenderer } from "../render";
import { HTMLElementPropMap, MintNode } from "../types";
import { isPlainObject } from "../utils";

type Props<Tag extends keyof HTMLElementPropMap> = HTMLElementPropMap[Tag];

type MintHTMLElementFactory<Tag extends keyof HTMLElementPropMap> = {
  /** Factory function for creating a MintHTMLElement */
  (props: Props<Tag>, ...children: MintNode[]): MintElementValue;
  /** Factory function for creating a MintHTMLElement */
  (...children: MintNode[]): MintElementValue;
};

const f = <Tag extends keyof HTMLElementPropMap>(tag: Tag) => {
  const factory: MintHTMLElementFactory<Tag> = (
    propsOrChild: any,
    ...children: any[]
  ) => {
    let props = {};
    let _children = [...children];

    if (
      isPlainObject(propsOrChild) &&
      !propsOrChild.hasOwnProperty("toMintElement")
    ) {
      props = propsOrChild;
    } else {
      _children = [propsOrChild, ...children];
    }

    return {
      toMintElement(renderer) {
        return new MintHTMLElement(
          tag,
          props,
          renderer.nodesToElements(_children),
          renderer as MintRenderer<any> & HTMLElementRenderer<any>
        );
      },
    };
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
  main: f("main"),
};
