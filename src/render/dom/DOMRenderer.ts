import {
  MintComponentElement,
  MintElement,
  MintHTMLElement,
  MintReactiveElement,
  MintTextElement,
} from "../../elements";
import { MintNode } from "../../types";
import {
  initElementsChildren,
  isEmptyNode,
  isEventProp,
  isReactive,
  isTextNode,
} from "../../utils";
import { HTMLElementRenderer, MintRenderer } from "../types";
import { DOMNode } from "./types";

export class DOMRenderer
  implements MintRenderer<DOMNode>, HTMLElementRenderer<HTMLElement>
{
  currentComponent: MintComponentElement<any> | undefined;

  getNodes(...elements: MintElement[]): DOMNode[] {
    return elements.map((el) => el.getNodes()).flat(Infinity);
  }

  createFromMultiple(elements: MintElement[]): DOMNode[] {
    return elements.map((el) => el.create()).flat(Infinity);
  }

  onInsertion(elements: MintElement[]): void {
    console.log(elements);
  }

  destroyMultiple(elements: MintElement[]): void {
    elements.forEach((el) => el.destroy());
  }

  createHTMLElement(el: MintHTMLElement): HTMLElement[] {
    const dom = document.createElement(el.tag);
    return [dom];
  }

  setHTMLElementProp(
    el: MintHTMLElement,
    propKey: string,
    propValue: any
  ): void {
    if (!el.node) return;
    if (isEventProp(propKey)) {
      el.node?.addEventListener(
        this.getEventTypeFromPropKey(propKey),
        propValue
      );
    }
    if (propKey === "style") {
      this.setStyleProp(el.node, propValue);
    }
    //
    else {
      el.node.setAttribute(propKey, propValue);
    }
  }

  setStyleProp = (node: HTMLElement, styleValue: any) => {
    for (const [key, value] of Object.entries(styleValue as any) as any) {
      let v = value;

      if (typeof v === "number") {
        v = `${v}px`;
      }
      node.style[key] = v;
    }
  };

  addHTMLElementChildren(el: MintHTMLElement, nodes: DOMNode[]): void {
    el.node?.append(...nodes);
  }

  destroyHTMLElement(el: MintHTMLElement): void {
    if (el.node) {
      el.node.remove();
      el.node = undefined;
    }
  }

  createReactiveElement(el: MintReactiveElement<DOMNode>): DOMNode[] {
    return [new Text(String(el.reactive.value))];
  }
  updateReactiveElement(el: MintReactiveElement<DOMNode>): void {
    if (!el.node) return;
    el.node.textContent = String(el.reactive.value);
  }
  destroyReactiveElement(el: MintReactiveElement<DOMNode>): void {
    if (el.node) {
      el.node.remove();
    }
  }

  createTextElement(el: MintTextElement<Text>): Text[] {
    return [new Text(el.text)];
  }
  destroyTextElement(el: MintTextElement<Text>): void {
    if (el.node) {
      el.node.remove();
    }
  }

  insertElements(parent: MintElement, elements: MintElement[]): void {
    const nearestDOMAncestor = this.findNearestDOMElementAncestor(parent);
    if (!nearestDOMAncestor.node) return;

    const domNodes = this.getNodes(...elements);

    const lastChildEl = elements.at(-1);
    const nodeAfter = lastChildEl
      ? this.findNodeAfter(lastChildEl, nearestDOMAncestor)
      : undefined;

    for (const domNode of domNodes) {
      nearestDOMAncestor.node.insertBefore(domNode, nodeAfter ?? null);
    }
  }

  findNearestDOMElementAncestor = (el: MintElement<Node>) => {
    let parent = el.parent;
    while (parent && parent.type !== "dom") {
      parent = parent.parent;
    }
    return parent as MintHTMLElement<Node>;
  };

  findNodeAfter = (el: MintElement, nearestDOMAncestor: MintHTMLElement) => {
    let parent = el.parent;
    let index = el.index + 1;
    while (parent) {
      const first = this.getNodes(...parent.children.slice(index))[0];
      if (first) {
        return first;
      }
      if (parent === nearestDOMAncestor) return;
      index = parent.index + 1;
      parent = parent.parent;
    }
  };

  getEventTypeFromPropKey(propKey: string) {
    return propKey.slice(2).toLowerCase();
  }

  nodesToElements(...nodes: any[]): MintElement<DOMNode>[] {
    const elements: MintElement<DOMNode>[] = [];

    for (const node of nodes.flat(Infinity)) {
      if (isEmptyNode(node)) continue;
      if (isTextNode(node)) {
        elements.push(new MintTextElement(String(node), this));
        continue;
      }
      if (isReactive(node)) {
        elements.push(new MintReactiveElement(node, this));
        continue;
      }
      if (typeof node === "object" && node.hasOwnProperty("toMintElement")) {
        elements.push(node.toMintElement(this));
      }
    }

    return elements;
  }

  render(node: MintNode, container: HTMLElement) {
    const elements = this.nodesToElements(node);

    const containerEl = new MintHTMLElement(
      container.tagName.toLowerCase(),
      {},
      elements,
      this
    );
    containerEl.node = container;
    containerEl.isInserted = true;
    initElementsChildren(containerEl, ...elements);

    const domNodes = this.createFromMultiple(elements);

    this.currentComponent = undefined;

    for (const domNode of domNodes) {
      container.append(domNode);
    }
  }
}
