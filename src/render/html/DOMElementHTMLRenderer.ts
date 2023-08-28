import { MintDOMElement } from "../../elements";
import { isEventProp } from "../../utils";
import { HTMLRenderer } from "./HTMLRenderer";
import { DOMElementHTMLNode } from "./types";

export class DOMElementHTMLRenderer {
  constructor(renderer: HTMLRenderer) {
    this.renderer = renderer;
  }
  renderer;

  toHTMLNodes(el: MintDOMElement) {
    let props: Record<string, string> = {};

    for (const [key, value] of Object.entries(el.props)) {
      if (isEventProp(key)) continue;
      else if (key === "style") {
        props.style = this.getStyleStringFromStyleObject(value);
      }
      //
      else {
        props[key] = String(value);
      }
    }

    const node: DOMElementHTMLNode = {
      type: "dom",
      tag: el.tag,
      props,
      children: this.renderer.toHTMLNodesFromMultiple(...el.children),
    };

    return [node];
  }

  getStyleStringFromStyleObject(styleObj: any) {
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
  }

  htmlNodeToString(node: DOMElementHTMLNode) {
    let s = `<${node.tag}`;

    const props: string[] = [];
    for (const [key, value] of Object.entries(node.props)) {
      const keyAlias = ATTRIBUTE_ALIASES[key];

      props.push(`${keyAlias ?? key}="${value}"`);
    }

    if (props.length > 0) {
      s += ` ${props.join(" ")}`;
    }

    if (node.children.length > 0) {
      const childrenString = this.renderer.htmlNodesToString(...node.children);
      s += `>${childrenString}</${node.tag}>`;
    }
    //
    else {
      s += "/>";
    }

    return s;
  }
}

const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};
