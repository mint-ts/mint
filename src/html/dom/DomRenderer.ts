import {
  Job,
  MintApi,
  MintElement,
  MintParentElement,
  MintRenderer,
  MintTextNode,
  Reactive,
  ShowElement,
} from "../../core";
import { HtmlElement, TextElement } from "../elements";
import { isObjectOfType } from "../utils";
import { DomNode } from "./types";

export class DomRenderer implements MintRenderer<DomNode> {
  constructor(api: MintApi, container: HTMLElement) {
    this.api = api;
    this.container = container;
  }
  api;
  container;

  createRootElement(): MintParentElement {
    const root = new HtmlElement(
      this.container.nodeName.toLowerCase(),
      {},
      this.api
    );
    root.node = this.container;
    return root;
  }

  createTextElement(node: MintTextNode) {
    return new TextElement(String(node), this.api);
  }

  createReactiveElement(node: Reactive<any>) {
    return new TextElement(node, this.api);
  }

  run(nodes: DomNode[]) {
    window.requestAnimationFrame(() => {
      this.container.append(...nodes);
      // api.onInsertElements(elements);
    });
  }

  update(actions: Function[]) {
    window.requestAnimationFrame(() => {
      for (const action of actions) {
        action();
      }
    });
  }

  createInsertShowNodesJob(el: ShowElement, nodes: DomNode[]): Job {
    return () => {
      this.insertShowNodes(el, nodes);
    };
  }

  createInsertNodesJob(parentEl: MintElement, nodes: DomNode[]): Job {
    return () => {
      const len = nodes.length;
      const htmlAncestor = this.findNearestHtmlElementAncestor(parentEl);

      if (!htmlAncestor.node) return;

      for (let i = 0; i < len; i++) {
        const node = nodes[i];
        htmlAncestor.node.insertBefore(node, null);
      }
    };
  }

  createRemoveNodesJob(nodes: DomNode[]) {
    return () => {
      nodes.forEach((n) => n.remove());
    };
  }

  insertShowNodes(el: ShowElement, nodes: DomNode[]) {
    if (el.children.length === 0) return;
    const htmlAncestor = this.findNearestHtmlElementAncestor(el);
    if (!htmlAncestor) return;
    const ancestorNode = htmlAncestor.node;
    if (ancestorNode) {
      const nodeAfter = this.findFirstDomNodeAfter(
        el.children.at(-1)!,
        htmlAncestor
      );
      for (const domNode of nodes) {
        ancestorNode.insertBefore(domNode, nodeAfter ?? null);
      }
    }
  }

  findNearestHtmlElementAncestor(el: MintElement) {
    let parent = el.parent;
    while (parent && !isObjectOfType(parent, "html")) {
      parent = parent.parent;
    }
    return parent as HtmlElement;
  }

  findFirstDomNodeAfter(el: MintElement, nearestDOMAncestor: HtmlElement) {
    let parent = el.parent;
    let index = el.index + 1;
    while (parent) {
      const first = this.api.getNodes(parent.children.slice(index))[0];
      if (first) return first;
      if (parent === nearestDOMAncestor) return;
      index = parent.index + 1;
      parent = parent.parent;
    }
  }
}
