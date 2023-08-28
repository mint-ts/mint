import { MintListElement } from "../../elements";
import { HTMLRenderer } from "./HTMLRenderer";

export class ListElementHTMLRenderer {
  constructor(renderer: HTMLRenderer) {
    this.renderer = renderer;
  }
  renderer;

  toHTML(el: MintListElement) {
    el.create();

    const unsub = el.array.subscribe(() => {
      this.patch(el);
    });

    el.cleanups.add(unsub);

    return this.renderer.toHTMLNodesFromMultiple(...el.children);
  }

  patch(el: MintListElement) {
    const patchItems = el.getPatch();
    console.log(patchItems);
  }
}
