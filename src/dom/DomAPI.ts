import { getPatch } from "fast-array-diff";
import { currentComponent } from "../currentComponent";
import { MintElement } from "../elements";
import { MintNode } from "../types";
import {
  filterNodes,
  getReactiveValue,
  initElementsChildren,
  isParentElement,
  isReactive,
} from "../utils";
import { DOMNode, IDomAPI } from "./types";

/** Main class for manipulating the DOM */
export class DomAPI implements IDomAPI {
  create(el: MintElement): DOMNode[] {
    switch (el.type) {
      case "component": {
        currentComponent.current = el;
        const elements = filterNodes(el.data.render(el.data.props));
        currentComponent.current = undefined;

        elements.forEach((childEl, i) => {
          childEl.parent = el;
          childEl.index = i;
        });

        el.data.children = elements;

        return this.createMultiple(...el.data.children);
      }
      case "dom": {
        const dom = document.createElement(el.data.tag);
        el.data.dom = dom;

        for (const child of el.data.children) {
          dom.append(...this.create(child));
        }

        for (const [key, value] of Object.entries(el.data.props)) {
          if (isEventProp(key)) {
            dom.addEventListener(getEventTypeFromPropKey(key), value as any);
          }
          //
          else if (key === "style") {
            setStyleProp(el, getReactiveValue(value));
          }
          //
          else {
            (dom as any)[key] = getReactiveValue(value);
            if (isReactive(value)) {
              const unsub = value.subscribe(() => {
                (dom as any)[key] = value.value;
              });
              el.data.cleanUps.add(unsub);
            }
          }
        }

        return [dom];
      }
      case "provider": {
        return this.createMultiple(...el.data.children);
      }
      case "list": {
        const elements = filterNodes(
          ...el.data.reactiveArray.value.map(el.data.render)
        );

        elements.forEach((child, i) => {
          child.parent = el;
          child.index = i;
        });

        el.data.children = elements;

        const unsub = el.data.reactiveArray.subscribe(() => {
          this.patchList(el);
        });

        el.data.cleanUps.add(unsub);

        return this.createMultiple(...el.data.children);
      }
      case "show": {
        const unsub = el.data.reactive.subscribe(() => {
          const isShown = this.getFirstMountedNodeFromMultiple(
            ...el.data.children
          );
          if (!el.data.reactive.value && isShown) {
            el.data.children.forEach((c: MintElement) => this.destroy(c));
          }
          if (el.data.reactive.value && !isShown) {
            el.data.children.forEach((c: MintElement) => this.create(c));
            this.insertElements(...el.data.children);
          }
        });

        el.data.cleanUps.add(unsub);

        if (!el.data.reactive.value) return [];

        return this.createMultiple(...el.data.children);
      }
      case "text": {
        const text = new Text(el.data.text);
        el.data.dom = text;
        return [text];
      }
      case "reactive": {
        const text = new Text(el.data.reactive.value);
        el.data.dom = text;
        const unsub = el.data.reactive.subscribe(() => {
          if (el.data.dom) {
            el.data.dom.textContent = el.data.reactive.value;
          }
        });
        el.data.cleanUps.add(unsub);

        return [text];
      }
      default:
        return [];
    }
  }

  getFirstMountedNode(el: MintElement): DOMNode | undefined {
    switch (el.type) {
      case "component":
      case "provider":
      case "list":
      case "show": {
        return this.getFirstMountedNodeFromMultiple(...el.data.children);
      }
      case "dom": {
        if (this.isDomNodeRendered(el.data.dom)) {
          return el.data.dom;
        }
        return;
      }
      case "text":
      case "reactive": {
        if (el.data.dom) {
          return el.data.dom;
        }
        return;
      }
      default:
        return;
    }
  }

  getAllMountedNodes(el: MintElement): DOMNode[] {
    switch (el.type) {
      case "component":
      case "provider":
      case "list":
      case "show": {
        return this.getAllMountedNodesFromMultiple(...el.data.children);
      }
      case "dom": {
        if (el.data.dom) {
          return [el.data.dom];
        }
        return [];
      }
      case "text":
      case "reactive": {
        if (el.data.dom) {
          return [el.data.dom];
        }
        return [];
      }
      default:
        return [];
    }
  }

  destroy(el: MintElement) {
    switch (el.type) {
      case "component": {
        this.destroyMultiple(...el.data.children);
        el.data.onMounts.clear();
        el.data.onDestroys.forEach((cb: Function) => cb());
        el.data.onDestroys.clear();
        break;
      }
      case "dom": {
        this.destroyMultiple(...el.data.children);
        if (el.data.dom) {
          el.data.dom.remove();
          el.data.dom = undefined;
        }
        break;
      }
      case "show": {
        this.destroyMultiple(...el.data.children);
        break;
      }
      case "list": {
        this.destroyMultiple(...el.data.children);
        break;
      }
      case "provider": {
        this.destroyMultiple(...el.data.children);
        break;
      }
      case "text": {
        if (el.data.dom) {
          el.data.dom.remove();
          el.data.dom = undefined;
        }
        break;
      }
      case "reactive": {
        if (el.data.dom) {
          el.data.dom.remove();
          el.data.dom = undefined;
        }
      }
    }
    el.data.cleanUps.forEach((f: Function) => f());
  }

  getFirstMountedNodeFromIndex(els: MintElement[], from: number) {
    for (let i = from; i < els.length; i++) {
      const el = els[i];

      if (el.type === "text") continue;

      const dom = this.getFirstMountedNode(el);

      if (this.isDomNodeRendered(dom)) {
        return dom;
      }
    }
  }

  createMultiple(...els: MintElement[]) {
    return els.map((child) => this.create(child)).flat(Infinity) as DOMNode[];
  }

  getFirstMountedNodeFromMultiple(...els: MintElement[]) {
    for (const el of els) {
      const dom = this.getFirstMountedNode(el);
      if (dom) {
        return dom;
      }
    }
  }

  getAllMountedNodesFromMultiple = (...els: MintElement[]) => {
    return els
      .map((el) => this.getAllMountedNodes(el))
      .flat(Infinity) as DOMNode[];
  };

  destroyMultiple = (...els: MintElement[]) => {
    els.forEach((el) => this.destroy(el));
  };

  findDOMParent(el: MintElement) {
    let parent = el.parent;
    while (parent && parent.type !== "dom") {
      parent = parent.parent;
    }
    if (parent && parent.type !== "dom") return;
    return parent;
  }

  findNodeAfter(el: MintElement, domParent?: MintElement) {
    let parent = el.parent;
    let index = el.index + 1;
    while (parent) {
      const first = this.getFirstMountedNodeFromIndex(
        parent.data.children,
        index
      );
      if (first) {
        return first;
      }
      if (parent === domParent) return;
      index = parent.index + 1;
      parent = parent.parent;
    }
  }

  insertElements(...els: MintElement[]) {
    for (const el of els) {
      const domParent = this.findDOMParent(el);
      const nodeAfter = this.findNodeAfter(el, domParent);
      if (domParent && domParent.data.dom) {
        const elDom = this.getAllMountedNodes(el);
        for (const d of elDom) {
          domParent.data.dom.insertBefore(d, nodeAfter ?? null);
        }
      }
    }
    this.callOnMount(...els);
  }

  callOnMount(...els: MintElement[]) {
    for (const el of els) {
      if (el.type === "component") {
        el.data.onMounts.forEach((cb: Function) => cb());
      }
      if (isParentElement(el)) {
        this.callOnMount(...el.data.children);
      }
    }
  }

  isDomNodeRendered(node?: DOMNode) {
    return node && document.body.contains(node);
  }

  patchList(el: MintElement) {
    if (el.type !== "list") return;
    const patchItems = getPatch(
      el.data.prevArrayValue ?? [],
      el.data.reactiveArray.value
    );
    el.data.prevArrayValue = el.data.reactiveArray.value;

    for (const patchItem of patchItems) {
      switch (patchItem.type) {
        case "add": {
          const elements = filterNodes(
            ...patchItem.items.map((item) => el.data.render(item))
          );
          el.data.children = [
            ...el.data.children.slice(0, patchItem.newPos),
            ...elements,
            ...el.data.children.slice(patchItem.newPos),
          ];
          elements.forEach((child, i) => {
            child.parent = el;
            child.index = patchItem.newPos + i;
            this.create(child);
          });
          this.insertElements(...elements);
          break;
        }
        case "remove": {
          for (
            let i = patchItem.newPos + (patchItem.items.length - 1);
            i >= patchItem.newPos;
            i--
          ) {
            const child = el.data.children[i];
            this.destroy(child);
          }
          el.data.children = [
            ...el.data.children.slice(0, patchItem.newPos),
            ...el.data.children.slice(
              patchItem.newPos + patchItem.items.length
            ),
          ];
          break;
        }
      }
    }
  }

  render(node: MintNode, container: HTMLElement) {
    const elements = filterNodes(node);

    const containerEl = new MintElement({
      type: "dom",
      data: {
        tag: container.tagName.toLowerCase(),
        props: {},
        children: elements,
        dom: container,
      },
    });

    initElementsChildren(containerEl);
    const domNodes = this.createMultiple(...elements);

    currentComponent.current = undefined;

    for (const domNode of domNodes) {
      container.append(domNode);
    }

    this.callOnMount(...elements);
  }
}

const isEventProp = (propKey: string) => propKey.indexOf("on") === 0;

const getEventTypeFromPropKey = (propKey: string) =>
  propKey.slice(2).toLowerCase();

const setStyleProp = (el: MintElement, styleValue: any) => {
  if (el.type !== "dom" || !el.data.dom) return;
  for (const [key, value] of Object.entries(styleValue as any) as any) {
    let v = value;

    if (typeof v === "number") {
      v = `${v}px`;
    }
    el.data.dom.style[key] = v;
  }
};
