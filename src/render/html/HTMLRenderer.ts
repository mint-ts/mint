import {
  MintComponentElement,
  MintElement,
  MintElementValue,
  MintHTMLElement,
  MintReactiveElement,
  MintTextElement,
} from "../../elements";
import { MintNode } from "../../types";
import { isEmptyNode, isEventProp, isReactive, isTextNode } from "../../utils";
import { HTMLElementRenderer, MintRenderer } from "../types";
import { DOMElementHTMLNode, HTMLNode, TextElementHTMLNode } from "./types";

export class HTMLRenderer
  implements MintRenderer<HTMLNode>, HTMLElementRenderer<HTMLNode>
{
  currentComponent: MintComponentElement<any> | undefined;

  createHTMLElement(el: MintHTMLElement<HTMLNode>): HTMLNode {
    let props: Record<string, string> = {};

    const node: DOMElementHTMLNode = {
      type: "dom",
      tag: el.tag,
      props,
      children: this.createFromMultiple(el.children),
    };

    return node;
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

  setHTMLElementProp(
    el: MintHTMLElement<DOMElementHTMLNode>,
    propKey: string,
    propValue: any
  ): void {
    if (!el.node || isEventProp(propKey)) return;
    if (propKey === "style") {
      el.node.props.style = this.getStyleStringFromStyleObject(propValue);
    }
    //
    else {
      el.node.props[propKey] = String(propValue);
    }
  }

  addHTMLElementChildren(): void {}

  destroyHTMLElement(el: MintHTMLElement<HTMLNode>): void {}

  getNodes(...elements: MintElement<HTMLNode>[]): HTMLNode[] {
    return elements.map((el) => el.getNodes()).flat(Infinity) as HTMLNode[];
  }

  createFromMultiple(elements: MintElement<HTMLNode>[]): HTMLNode[] {
    return elements.map((el) => el.create()).flat(Infinity) as HTMLNode[];
  }

  onInsertion(elements: MintElement<HTMLNode>[]): void {}

  destroyMultiple(elements: MintElement<HTMLNode>[]): void {
    elements.forEach((el) => el.destroy());
  }

  createTextElement(el: MintTextElement<any>): HTMLNode {
    const node: TextElementHTMLNode = {
      type: "text",
      text: el.text,
    };
    el.htmlNode = node;
    return node;
  }

  destroyTextElement(el: MintTextElement<any>): void {}

  createReactiveElement(el: MintReactiveElement<HTMLNode>): HTMLNode {
    const node: TextElementHTMLNode = {
      type: "text",
      text: el.reactive.value,
    };
    el.node = node;
    return node;
  }

  updateReactiveElement(el: MintReactiveElement<TextElementHTMLNode>): void {
    if (el.node) {
      el.node.text = el.reactive.value;
    }
  }

  destroyReactiveElement(el: MintReactiveElement<TextElementHTMLNode>): void {}

  nodesToElements(...nodes: MintNode[]): MintElement<HTMLNode>[] {
    const elements: MintElement<HTMLNode>[] = [];

    for (const node of nodes.flat(Infinity as 1)) {
      if (isEmptyNode(node)) continue;
      if (isTextNode(node)) {
        elements.push(new MintTextElement(String(node), this));
        continue;
      }
      if (isReactive(node)) {
        elements.push(new MintReactiveElement(node, this));
        continue;
      }
      if (node instanceof MintElementValue) {
        elements.push(node.toMintElement(this));
      }
    }

    return elements;
  }

  insertElements(
    parent: MintElement<HTMLNode>,
    children: MintElement<HTMLNode>[]
  ): void {
    console.log(parent, children);
  }

  htmlElementNodeToString(node: DOMElementHTMLNode) {
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
      const childrenString = this.htmlNodesToString(...node.children);
      s += `>${childrenString}</${node.tag}>`;
    }
    //
    else {
      s += "/>";
    }

    return s;
  }

  htmlNodeToString(node: HTMLNode): string {
    switch (node.type) {
      case "dom": {
        return this.htmlElementNodeToString(node);
      }
      case "show": {
        return this.htmlNodesToString(...node.children);
      }
      case "text": {
        return node.text;
      }
      default:
        return "";
    }
  }

  htmlNodesToString(...nodes: HTMLNode[]) {
    return nodes.map((n) => this.htmlNodeToString(n)).join("");
  }

  render(node: MintNode): string {
    const elements = this.nodesToElements(node);

    const nodes = this.createFromMultiple(elements);

    return this.htmlNodesToString(...nodes);
  }
}

const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};
