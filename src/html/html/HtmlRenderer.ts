import { MintApi, MintRenderer, MintTextNode, Reactive } from "../../core";
import { TextElement } from "../elements";

export class HtmlRenderer implements MintRenderer<any> {
  constructor(public api: MintApi) {}

  _type = "html";

  createTextElement(node: MintTextNode) {
    return new TextElement(String(node), this.api);
  }

  createReactiveElement(node: Reactive<any>) {
    return new TextElement(node, this.api);
  }

  run(nodes: any[]) {
    return nodes.map((n) => n.toHtml()).join("");
  }

  update() {}
}
