import { State } from "../reactive";
import { MintElement, MintNode, MintRenderer } from "../types";
import { ComponentAPI } from "./ComponentAPI";
import { SubscriptionManager } from "./SubscriptionManager";
import { isElementFactory } from "./createElementFactory";
import {
  MintComponentElement,
  MintElementCoreWorksWith,
  MintListElement,
  MintShowElement,
  isCoreElement,
  isElementOfType,
} from "./elements";
import { isEmptyNode } from "./isEmptyNode";

export class Core<RendererElement extends MintElement, Node> {
  constructor(
    createRenderer: (
      core: Core<RendererElement, Node>
    ) => MintRenderer<any, Node>
  ) {
    this.renderer = createRenderer(this);
    this.manager = new SubscriptionManager(this.renderer.flushUpdates);
  }
  renderer;
  manager;

  createElements(...nodes: MintNode[]) {
    const elements: MintElementCoreWorksWith<RendererElement>[] = [];
    for (const node of nodes.flat(Infinity as 1)) {
      if (isEmptyNode(node)) continue;
      else if (isElementFactory(node)) {
        elements.push(node.create(this));
      } else {
        const el = this.renderer.createElement(node);
        if (el) elements.push(el);
      }
    }
    return elements;
  }

  getAllNodes(elements: MintElementCoreWorksWith<RendererElement>[]): Node[] {
    const nodes: Node[] = [];
    const len = elements.length;
    for (let i = 0; i < len; i++) {
      const el = elements[i];
      if (isCoreElement(el)) {
        nodes.push(...this.getAllNodes(el.children));
      }
      //
      else {
        const node = this.renderer.getNode(el);
        if (node) nodes.push(node);
      }
    }
    return nodes;
  }

  getFirstNode(
    elements: MintElementCoreWorksWith<RendererElement>[]
  ): Node | undefined {
    const len = elements.length;
    for (let i = 0; i < len; i++) {
      const el = elements[i];
      if (isCoreElement(el)) {
        return this.getFirstNode(el.children);
      }
      //
      else {
        return this.renderer.getNode(el);
      }
    }
  }

  createNodes(
    elements: MintElementCoreWorksWith<RendererElement>[],
    parent?: MintElementCoreWorksWith<RendererElement>,
    startIndex = 0
  ): Node[] {
    const nodes: Node[] = [];
    const len = elements.length;

    for (let i = 0; i < len; i++) {
      const el = elements[i];
      el.index = startIndex + i;
      el.parent = parent;

      if (isCoreElement(el)) {
        if (isElementOfType(el, "show")) {
          nodes.push(...this.createShow(el));
        } else if (isElementOfType(el, "component")) {
          nodes.push(...this.createComponent(el));
        } else if (isElementOfType(el, "list")) {
          nodes.push(...this.createList(el));
        } else if (isElementOfType(el, "provider")) {
          nodes.push(...this.createNodes(el.children, el));
        }
      }
      //
      else {
        nodes.push(this.renderer.createNode(el));
      }
    }
    return nodes;
  }

  destroyNodes(elements: MintElementCoreWorksWith<RendererElement>[]) {
    const len = elements.length;
    for (let i = 0; i < len; i++) {
      const el = elements[i];

      if (isCoreElement(el)) {
        if (isElementOfType(el, "show")) {
          this.destroyShow(el);
        } else if (isElementOfType(el, "component")) {
          this.destroyComponent(el);
        } else if (isElementOfType(el, "list")) {
          this.destroyList(el);
        } else if (isElementOfType(el, "provider")) {
          this.destroyNodes(el.children);
        }
      }
      //
      else {
        this.renderer.destroyNode(el);
      }
    }
  }

  createComponent(el: MintComponentElement<any>) {
    const api = new ComponentAPI(el, this);
    const node = el.render(api);
    const elements = this.createElements(node);
    el.children = elements;
    return this.createNodes(el.children, el);
  }

  destroyComponent(el: MintComponentElement<any>) {
    this.manager.deleteMany(...el.state, ...el.computed);
    el.state = [];
    el.computed = [];
    this.destroyNodes(el.children);
  }

  createShow(el: MintShowElement) {
    el.dispose = this.manager.subscribeConsumer(el.reactive, () => {
      this.patchShow(el);
    });
    const condition = Boolean(el.reactive.value);
    el.prevCondition = condition;
    el.children = condition ? el.trueEls : el.falseEls;
    return this.createNodes(el.children, el);
  }

  destroyShow(el: MintShowElement) {
    el.dispose?.();
    this.destroyNodes(el.children);
  }

  patchShow(el: MintShowElement) {
    const condition = Boolean(el.reactive.value);
    if (el.prevCondition == null || el.prevCondition !== condition) {
      if (condition) {
        this.destroyNodes(el.falseEls);
        this.renderer.insertShowNodes(el, el.trueEls);
      }
      //
      else {
        this.destroyNodes(el.trueEls);
        this.renderer.insertShowNodes(el, el.falseEls);
      }
      el.children = condition ? el.trueEls : el.falseEls;
    }
    el.prevCondition = condition;
  }

  createList(el: MintListElement<any>) {
    el.dispose = this.manager.subscribeConsumer(el.reactiveArray, () => {
      this.renderer.patchList(el);
    });
    const elements = el.reactiveArray.value
      .map((item, index) => {
        const stateIndex = new State(index, this);
        const computedIndex = stateIndex.derive((i) => i);
        const nodes = el.renderItem(item, computedIndex);
        const els = this.createElements(nodes);
        el.cache.set(item, {
          stateIndex,
          computedIndex,
          els,
        });
        return els;
      })
      .flat(Infinity) as MintElementCoreWorksWith<RendererElement>[];
    el.children = elements;
    return this.createNodes(el.children, el);
  }

  destroyList(el: MintListElement<any>) {
    el.dispose?.();
    this.destroyNodes(el.children);
  }

  destroyListItem(el: MintListElement<any>, item: any) {
    const cacheItem = el.cache.get(item);
    if (!cacheItem) return;
    this.destroyNodes(cacheItem.els);
    this.manager.deleteMany(cacheItem.stateIndex, cacheItem.computedIndex);
    el.cache.delete(item);
  }
}
