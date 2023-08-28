// import { currentComponent } from "../../currentComponent";
// import {
//   MintDOMElement,
//   MintElement,
//   MintListElement,
//   MintParentElement,
//   MintShowElement,
// } from "../../elements";
// import { isParentElement } from "../../utils";
// import { MintRenderer } from "../types";
// import { DOMNode } from "./types";

// export class DOMRenderer implements MintRenderer<DOMNode, HTMLElement, void> {
//   htmlCreate({ el }: { el: MintDOMElement<any> }): DOMNode[] {
//     const dom = document.createElement(el.tag);

//     // for (const child of el.children) {
//     //   dom.append(...create(child));
//     // }

//     return [dom];
//   }

//   htmlSetEventListener(args: {
//     el: MintDOMElement<any>;
//     eventType: string;
//     eventListener: any;
//   }): void {
//     throw new Error("Method not implemented.");
//   }

//   htmlSetProp({
//     el,
//     propKey,
//     propValue,
//   }: {
//     el: MintDOMElement<any>;
//     propKey: string;
//     propValue: any;
//   }): void {
//     if (!el.node) return;
//     if (propKey === "style") {
//       this.setStyleProp(el.node, propValue);
//     }
//     //
//     else {
//       el.node.setAttribute(propKey, propValue);
//     }
//   }

//   htmlDestroy({ el }: { el: MintDOMElement }): void {
//     if (el.node) {
//       el.node.remove();
//       el.node = undefined;
//     }
//   }

//   onShowElements({
//     el,
//     elements,
//   }: {
//     el: MintShowElement;
//     elements: MintElement[];
//   }): void {
//     this.createFromMultiple(...elements);
//     this.insertChildElements(el, elements);
//   }

//   onRemoveElements({
//     elements,
//   }: {
//     el: MintShowElement;
//     elements: MintElement[];
//   }): void {
//     this.destroyMultiple(...elements);
//   }

//   onListAddElements({
//     el,
//     newElements,
//   }: {
//     el: MintListElement;
//     newElements: MintElement[];
//     index: number;
//   }): void {
//     this.createFromMultiple(...newElements);
//     this.insertChildElements(el, newElements);
//   }

//   onListRemoveElements({
//     removedElements,
//   }: {
//     el: MintListElement;
//     removedElements: MintElement[];
//     index: number;
//   }): void {
//     this.destroyMultiple(...removedElements);
//   }

//   setHTMLElementEventListener({
//     el,
//     eventType,
//     eventListener,
//   }: {
//     el: MintDOMElement<HTMLElement>;
//     eventType: string;
//     eventListener: any;
//   }): void {
//     if (!el.node) return;
//     console.log(eventType);
//     el.node.addEventListener(eventType, eventListener);
//   }

//   setStyleProp(node: HTMLElement, styleValue: any) {
//     for (const [key, value] of Object.entries(styleValue as any) as any) {
//       let v = value;

//       if (typeof v === "number") {
//         v = `${v}px`;
//       }
//       node.style[key] = v;
//     }
//   }

//   createFromMultiple(...els: MintElement[]) {
//     return els.map((el) => el.create()).flat(Infinity) as DOMNode[];
//   }

//   insertChildElements(
//     el: MintParentElement,
//     childEls: MintElement[] = el.children
//   ) {
//     const nearestDOMAncestor = this.findNearestDOMElementAncestor(el);
//     if (!nearestDOMAncestor.node) return;

//     const domNodes = this.getDOMNodesForInsertionFromMultiple(...childEls);
//     const lastChildEl = childEls.at(-1);
//     const nodeAfter = lastChildEl
//       ? this.findNodeAfter(lastChildEl, nearestDOMAncestor)
//       : undefined;

//     for (const domNode of domNodes) {
//       nearestDOMAncestor.node.insertBefore(domNode, nodeAfter ?? null);
//     }
//     // this.onInsertion(...childEls);
//   }

//   findNearestDOMElementAncestor(el: MintElement) {
//     let parent = el.parent;
//     while (parent && parent.type !== "dom") {
//       parent = parent.parent;
//     }
//     return parent as MintDOMElement<HTMLElement>;
//   }

//   getDOMNodesForInsertion(el: MintElement): DOMNode[] {
//     switch (el.type) {
//       case "component":
//       case "provider":
//       case "list":
//       case "show": {
//         return this.getDOMNodesForInsertionFromMultiple(...el.children);
//       }
//       case "dom":
//       case "text":
//       case "reactive": {
//         if (el.node) {
//           return [el.node];
//         }
//         return [];
//       }
//       default:
//         return [];
//     }
//   }

//   getDOMNodesForInsertionFromMultiple = (...els: MintElement[]) => {
//     return els
//       .map((el) => this.getDOMNodesForInsertion(el))
//       .flat(Infinity) as DOMNode[];
//   };

//   findNodeAfter(el: MintElement, nearestDOMAncestor: MintDOMElement) {
//     let parent = el.parent;
//     let index = el.index + 1;
//     while (parent) {
//       const first = this.getFirstInsertedDOMNodeFromMultiple(
//         ...parent.children.slice(index)
//       );
//       if (first) {
//         return first;
//       }
//       if (parent === nearestDOMAncestor) return;
//       index = parent.index + 1;
//       parent = parent.parent;
//     }
//   }

//   getFirstInsertedDOMNode(el: MintElement): DOMNode | undefined {
//     switch (el.type) {
//       case "component":
//       case "provider":
//       case "list":
//       case "show": {
//         return this.getFirstInsertedDOMNodeFromMultiple(...el.children);
//       }
//       case "dom":
//       case "text":
//       case "reactive": {
//         if (el.node && el.isInserted) {
//           return el.node;
//         }
//         return;
//       }
//       default:
//         return;
//     }
//   }

//   getFirstInsertedDOMNodeFromMultiple = (...els: MintElement[]) => {
//     for (const el of els) {
//       const dom = this.getFirstInsertedDOMNode(el);
//       if (dom) {
//         return dom;
//       }
//     }
//   };

//   // onInsertion(...els: MintElement[]) {
//   //   for (const el of els) {
//   //     console.log(el);
//   //     if (el.parent!.type === "show" && el.parent!.when.value === false) {
//   //     } else {
//   //       el.isInserted = true;
//   //     }

//   //     if (el.type === "component") {
//   //       el.onMounts.forEach((cb: Function) => cb());
//   //     }
//   //     if (isParentElement(el)) {
//   //       this.onInsertion(...el.children);
//   //     }
//   //   }
//   // }

//   destroy(el: MintElement) {
//     switch (el.type) {
//       case "dom": {
//         break;
//       }
//       case "component": {
//         this.destroyMultiple(...el.children);
//         break;
//       }
//       case "list":
//       case "show":
//       case "provider": {
//         this.destroyMultiple(...el.children);
//         break;
//       }
//       case "text": {
//         if (el.node) {
//           el.node.remove();
//           el.node = undefined;
//         }
//         break;
//       }
//       case "reactive": {
//         if (el.node) {
//           el.node.remove();
//           el.node = undefined;
//         }
//         break;
//       }
//     }
//     el.end();
//   }

//   destroyMultiple(...els: MintElement[]) {
//     els.forEach((el) => this.destroy(el));
//   }

//   render(elements: MintElement[], container: HTMLElement) {
//     const containerEl = new MintDOMElement({
//       tag: container.tagName.toLowerCase(),
//       props: {},
//       children: elements,
//       tree: {
//         renderer: {
//           createNodeFromHTMLElement: () => container,
//         },
//       } as any,
//     });
//     // containerEl.create();
//     containerEl.node = container;
//     containerEl.isInserted = true;

//     const domNodes = this.createFromMultiple(...elements);

//     currentComponent.current = undefined;

//     for (const domNode of domNodes) {
//       container.append(domNode);
//     }

//     // this.onInsertion(...elements);
//   }
// }
