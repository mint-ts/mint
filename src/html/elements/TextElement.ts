import {
  Effect,
  MintApi,
  MintElement,
  Reactive,
  getReactiveValue,
  isReactive,
} from "../../core";
import { TYPE_MAP } from "../constants";

export class TextElement implements MintElement {
  constructor(public text: string | Reactive<string>, public api: MintApi) {}
  _type = TYPE_MAP.text;
  index = 0;
  node?: any;
  effect?: Effect;

  create() {
    if ((this.api.renderer as any)._type === "html") {
      this.node = this;
    }
    //
    else {
      this.createDomNode();
    }
  }

  toHtml() {
    return getReactiveValue(this.text);
  }

  createDomNode() {
    if (isReactive(this.text)) {
      this.effect = new Effect(
        () => {
          (this.text as Reactive<any>).value;
        },
        this.api.manager,
        () => {
          this.api.addJob(() => {
            if (!this.node) return;
            this.node.textContent = (this.text as Reactive<any>).value;
          });
        }
      );
      this.effect.run();
    }
    //
    const txt = document.createTextNode(getReactiveValue(this.text));
    this.node = txt;
  }

  destroy() {
    if (this.effect) {
      this.effect.destroy();
      this.effect = undefined;
    }
  }
}
