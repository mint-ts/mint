import { ShowElement } from "./elements";
import { ReactiveManager } from "./reactive";
import {
  Job,
  MintElement,
  MintNode,
  MintParentElement,
  MintRenderer,
} from "./types";
import {
  isCoreElement,
  isCoreObjectOfType,
  isEmptyNode,
  isReactive,
  isTextNode,
} from "./utils";

type MintApiConfig = {
  createRenderer: (api: MintApi) => MintRenderer<any>;
};

export class MintApi {
  constructor(config: MintApiConfig) {
    this.config = config;
    this.renderer = config.createRenderer(this);
  }
  config;
  renderer;
  manager = new ReactiveManager(this);
  queue = new Set<Job>();
  actions: Function[] = [];
  insertedElements: MintElement[] = [];
  removedElements: MintElement[] = [];
  pending = new Set<Promise<any>>();
  rootElements: MintElement[] = [];

  createElements(...nodes: MintNode[]) {
    const elements: MintElement[] = [];
    const flatNodes = nodes.flat(Infinity as 1);
    const nodesLen = flatNodes.length;

    for (let i = 0; i < nodesLen; i++) {
      const node = flatNodes[i];

      if (isEmptyNode(node)) continue;
      else if (isCoreObjectOfType(node, "elFactory")) {
        elements.push(node.create(this));
      }
      //
      else if (this.renderer.createTextElement && isTextNode(node)) {
        elements.push(this.renderer.createTextElement(node));
      }
      //
      else if (this.renderer.createReactiveElement && isReactive(node)) {
        elements.push(this.renderer.createReactiveElement(node));
      }
    }

    return elements;
  }

  getNodes(elements: MintElement[]) {
    const nodes: any[] = [];
    const len = elements.length;
    for (let i = 0; i < len; i++) {
      const el = elements[i];
      if (isCoreElement(el)) {
        nodes.push(...this.getNodes(el.children));
      }
      //
      else {
        if (el.node) {
          nodes.push(el.node);
        }
      }
    }
    return nodes;
  }

  create(
    elements: MintElement[],
    parent: MintParentElement | undefined,
    startIndex = 0
  ) {
    const len = elements.length;
    const nodes: any[] = [];

    for (let i = 0; i < len; i++) {
      const el = elements[i];
      el.index = startIndex + i;
      el.parent = parent;
      const result = el.create();

      if (Array.isArray(result)) {
        nodes.push(...result);
      }
      //
      else {
        nodes.push(result);
      }
    }
    return nodes;
  }

  addJob(job: Job) {
    this.queue.add(job);
  }

  insertShowElements(el: ShowElement, els: MintElement[]) {
    if (this.renderer.createInsertShowNodesJob) {
      const nodes = this.getNodes(els);
      const job = this.renderer.createInsertShowNodesJob(el, nodes);
      this.addJob(job);
    }
  }

  insertElements(el: MintParentElement, els: MintElement[], nodes: any[]) {
    if (this.renderer.createInsertNodesJob) {
      const job = this.renderer.createInsertNodesJob(el, nodes);
      this.addJob(job);
    }
  }

  destroy(elements: MintElement[]) {
    for (const el of elements) {
      el.destroy();
    }
    if (this.renderer.createRemoveNodesJob) {
      this.addJob(this.renderer.createRemoveNodesJob(this.getNodes(elements)));
    }
  }

  stateUpdated() {
    this.flushUpdates();
  }

  flushUpdates() {
    for (const job of Array.from(this.queue)) {
      job();
    }
    this.queue.clear();
  }

  addPending(promise: Promise<any>) {
    this.pending.add(promise);
    return () => {
      this.pending.delete(promise);
    };
  }

  run(node: MintNode) {
    let rootElement;

    if (this.renderer.createRootElement) {
      rootElement = this.renderer.createRootElement();
    }

    this.rootElements = this.createElements(node);

    this.create(this.rootElements, rootElement);

    return this.renderer.run(this.getNodes(this.rootElements));
  }
}
