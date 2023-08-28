import { MintShowElement } from "../../elements";
import { HTMLRenderer } from "./HTMLRenderer";
import { ShowElementHTMLNode } from "./types";

export class ShowElementHTMLRenderer {
  constructor(renderer: HTMLRenderer) {
    this.renderer = renderer;
  }
  renderer;

  toHTML(el: MintShowElement) {
    const node: ShowElementHTMLNode = {
      type: "show",
      children: this.renderer.toHTMLNodesFromMultiple(...el.children),
    };
    el.htmlNode = node;

    const unsub = el.when.subscribe(() => {
      if (!el.htmlNode) return;
      if (el.condition === el.prevCondition) return;

      // TODO: destroy no shown anymore
      el.htmlNode.children = this.renderer.toHTMLNodesFromMultiple(...el.children);
    });

    el.cleanups.add(unsub);

    return [node];
  }
}
