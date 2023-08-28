import {
  MintDOMElement,
  MintElement,
  MintListElement,
  MintShowElement,
} from "../../elements";
import { MintRenderer } from "../types";
import { DOMElementHTMLRenderer } from "./DOMElementHTMLRenderer";
import { ListElementHTMLRenderer } from "./ListElementHTMLRenderer";
import { ShowElementHTMLRenderer } from "./ShowElementHTMLRenderer";
import { HTMLNode, TextElementHTMLNode } from "./types";

export class HTMLRenderer implements MintRenderer<HTMLNode> {
  create(el: MintElement): HTMLNode[] {
    throw new Error("Method not implemented.");
  }
  onShowElements(args: { el: MintShowElement; elements: MintElement[] }): void {
    throw new Error("Method not implemented.");
  }
  onRemoveElements(args: {
    el: MintShowElement;
    elements: MintElement[];
  }): void {
    throw new Error("Method not implemented.");
  }
  onListAddElements(args: {
    el: MintListElement;
    newElements: MintElement[];
    index: number;
  }): void {
    throw new Error("Method not implemented.");
  }
  onListRemoveElements(args: {
    el: MintListElement;
    removedElements: MintElement[];
    index: number;
  }): void {
    throw new Error("Method not implemented.");
  }
  updateHTMLElementProp?(args: {
    el: MintDOMElement<any>;
    propKey: string;
    propValue: any;
  }): void {
    throw new Error("Method not implemented.");
  }
  destroy(el: MintElement): void {
    throw new Error("Method not implemented.");
  }

  toHTMLNodes(el: MintElement): HTMLNode[] {
    switch (el.type) {
      case "dom": {
        return new DOMElementHTMLRenderer(this).toHTMLNodes(el);
      }
      case "component": {
        el.create();
        return this.toHTMLNodesFromMultiple(...el.children);
      }
      case "provider": {
        return this.toHTMLNodesFromMultiple(...el.children);
      }
      case "show": {
        return new ShowElementHTMLRenderer(this).toHTML(el);
      }
      case "list": {
        return new ListElementHTMLRenderer(this).toHTML(el);
      }
      case "text": {
        const node: TextElementHTMLNode = {
          type: "text",
          text: el.text,
        };
        el.htmlNode = node;
        return [node];
      }
      case "reactive": {
        const node: TextElementHTMLNode = {
          type: "text",
          text: el.reactive.value,
        };
        el.htmlNode = node;
        const unsub = el.reactive.subscribe(() => {
          if (el.htmlNode) {
            el.htmlNode.text = el.reactive.value;
          }
        });
        el.cleanups.add(unsub);
        return [node];
      }
      default:
        return [];
    }
  }

  toHTMLNodesFromMultiple(...els: MintElement[]) {
    return els
      .map((child) => this.toHTMLNodes(child))
      .flat(Infinity) as HTMLNode[];
  }

  htmlNodeToString(node: HTMLNode): string {
    switch (node.type) {
      case "dom": {
        return new DOMElementHTMLRenderer(this).htmlNodeToString(node);
      }
      case "show": {
        return this.htmlNodesToString(...node.children);
      }
      case "text": {
        return node.text;
      }
    }
  }

  htmlNodesToString(...nodes: HTMLNode[]) {
    return nodes.map((n) => this.htmlNodeToString(n)).join("");
  }

  render(elements: MintElement[]) {
    const nodes = this.toHTMLNodesFromMultiple(...elements);

    return this.htmlNodesToString(...nodes);
  }
}
