import { createState } from "../reactive";
import { MintElement, MintNode } from "../types";
import { ComponentAPI } from "./ComponentAPI";
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

type CreateRendererArgs<RendererElement extends MintElement, Node> = {
  rootNode: MintNode;
  createElement: (node: MintNode) => RendererElement;
  createNode: (el: RendererElement) => Node;
  render: (nodes: Node[]) => any;
  destroyElement: (el: RendererElement);
};

export const createRenderer = <RendererElement extends MintElement, Node>({
  rootNode,
  createElement,
  createNode,
  render,
  destroyElement
}: CreateRendererArgs<RendererElement, Node>) => {
  const createElements = (...nodes: MintNode[]) => {
    const elements: MintElementCoreWorksWith<RendererElement>[] = [];
    for (const node of nodes.flat(Infinity as 1)) {
      if (isEmptyNode(node)) continue;
      else if (isElementFactory(node)) {
        elements.push(node.create(createElements));
      } else {
        const el = createElement(node);
        if (el) elements.push(el);
      }
    }
    return elements;
  };

  const destroyNodes = (elements: MintElementCoreWorksWith<RendererElement>[]) => {
    const len = elements.length;
    for (let i = 0; i < len; i++) {
      const el = elements[i];

      if (isCoreElement(el)) {
        if (isElementOfType(el, "show")) {
          destroyShow(el);
        } else if (isElementOfType(el, "component")) {
          destroyComponent(el);
        } else if (isElementOfType(el, "list")) {
          destroyList(el);
        } else if (isElementOfType(el, "provider")) {
          destroyNodes(el.children);
        }
      }
      //
      else {
        destroyElement(el);
      }
    }
  }

  const createComponent = (el: MintComponentElement<any>) => {
    const api = new ComponentAPI(el, {} as any);
    const node = el.render(api);
    const elements = createElements(node);
    el.children = elements;
    return createNodes(el.children, el);
  }

  const destroyComponent = (el: MintComponentElement<any>) => {
    // this.manager.deleteMany(...el.state, ...el.computed);
    el.state = [];
    el.computed = [];
    destroyNodes(el.children);
  }

  const createShow = (el: MintShowElement) => {
    // el.dispose = this.manager.subscribeConsumer(el.reactive, () => {
    //   this.patchShow(el);
    // });
    const condition = Boolean(el.reactive.value);
    el.prevCondition = condition;
    el.children = condition ? el.trueEls : el.falseEls;
    return createNodes(el.children, el);
  }

  const destroyShow = (el: MintShowElement) => {
    el.dispose?.();
    destroyNodes(el.children);
  }

  const createList = (el: MintListElement<any>) => {
    // el.dispose = this.manager.subscribeConsumer(el.reactiveArray, () => {
    //   this.renderer.patchList(el);
    // });
    const elements = el.reactiveArray.value
      .map((item, index) => {
        const stateIndex = createState({ initialValue: index, core: {} as any });
        const computedIndex = stateIndex.derive((i) => i);
        const nodes = el.renderItem(item, computedIndex);
        const els = createElements(nodes);
        el.cache.set(item, {
          stateIndex,
          computedIndex,
          els,
        });
        return els;
      })
      .flat(Infinity) as MintElementCoreWorksWith<RendererElement>[];
    el.children = elements;
    return createNodes(el.children, el);
  }

  const destroyList = (el: MintListElement<any>) => {
    el.dispose?.();
    destroyNodes(el.children);
  }

  const createNodes = (
    elements: MintElementCoreWorksWith<RendererElement>[],
    parent?: MintElementCoreWorksWith<RendererElement>,
    startIndex = 0
  ): Node[] => {
    const nodes: Node[] = [];
    const len = elements.length;

    for (let i = 0; i < len; i++) {
      const el = elements[i];
      el.index = startIndex + i;
      el.parent = parent;

      if (isCoreElement(el)) {
        if (isElementOfType(el, "show")) {
          nodes.push(...createShow(el));
        } else if (isElementOfType(el, "component")) {
          nodes.push(...createComponent(el));
        } else if (isElementOfType(el, "list")) {
          nodes.push(...createList(el));
        } else if (isElementOfType(el, "provider")) {
          nodes.push(...createNodes(el.children, el));
        }
      }
      //
      else {
        nodes.push(createNode(el));
      }
    }
    return nodes;
  };

  return {
    render() {
      const elements = createElements(rootNode);
      const nodes = createNodes(elements);
      return render(nodes);
    },
  };
};
