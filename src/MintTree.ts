import {
  MintComponentElement,
  MintDOMElement,
  MintElement,
  MintElementValue,
  MintListElement,
  MintProviderElement,
  MintReactiveElement,
  MintShowElement,
  MintTextElement,
} from "./elements";
import { MintRenderer } from "./render";
import { MintNode } from "./types";
import { isEmptyNode, isReactive, isTextNode } from "./utils";

export class MintTree {
  constructor({ node, renderer }: MintTreeArgs) {
    this.node = node;
    this.renderer = renderer(this);
  }
  node;
  renderer;
  currentComponent: any;

  nodesToElements(...nodes: MintNode[]) {
    const elements: MintElement[] = [];

    for (const node of nodes.flat(Infinity as 1)) {
      if (isEmptyNode(node)) continue;
      if (isTextNode(node)) {
        elements.push(
          new MintTextElement({
            text: String(node),
            tree: this,
          })
        );
      }
      //
      else if (isReactive(node)) {
        elements.push(
          new MintReactiveElement({
            reactive: node,
            tree: this,
          })
        );
      }
      //
      else if (node instanceof MintElementValue) {
        switch (node.type) {
          case "dom": {
            elements.push(
              new MintDOMElement({
                ...node.data,
                children: this.nodesToElements(...node.data.children),
                tree: this,
              })
            );
            break;
          }
          case "show": {
            elements.push(
              new MintShowElement({
                ...node.data,
                yes: this.nodesToElements(node.data.yes),
                no: this.nodesToElements(node.data.no),
                tree: this,
              })
            );
            break;
          }
          case "list": {
            elements.push(
              new MintListElement({
                ...node.data,
                tree: this,
              })
            );
            break;
          }
          case "component": {
            elements.push(
              new MintComponentElement({
                ...node.data,
                tree: this,
              })
            );
            break;
          }
          case "provider": {
            elements.push(
              new MintProviderElement({
                ...node.data,
                children: this.nodesToElements(...node.data.children),
                tree: this,
              })
            );
            break;
          }
        }
      }
    }

    return elements;
  }

  create(el: MintElement) {
    return el.create();
  }

  createFromMultiple(elements: MintElement[]) {
    return elements.map((el) => el.create()).flat(Infinity);
  }

  getNodes(...elements: MintElement[]): Node[] {
    return elements.map((el) => el.getNodes()).flat(Infinity) as Node[];
  }

  destroyMultiple(elements: MintElement[]) {
    elements.forEach((el) => el.destroy());
  }

  render(args: any) {
    const elements = this.nodesToElements(this.node);

    this.renderer.render(this.createFromMultiple(elements), args);
  }

  // start(args: RenderArgs) {
  //   const elements = this.nodesToElements(this.node);

  //   console.log(elements);

  //   // return this.renderer.render(elements, args);
  // }
}

export type MintTreeArgs = {
  node: MintNode;
  renderer: (tree: MintTree) => MintRenderer<any, any>;
};
