import {
  Effect,
  MintApi,
  MintElement,
  isEventProp,
  isReactive,
} from "../../core";
import { TYPE_MAP } from "../constants";
import { UseFn } from "../types";
import { svgTags } from "./svgTags";

export class HtmlElement implements MintElement {
  constructor(
    public tag: string,
    public props: Record<string, any>,
    public api: MintApi
  ) {
    this.children = api.createElements(props.node);
    this.isSvg = svgTags.includes(this.tag as any);
  }
  _type = TYPE_MAP.html;
  index = 0;
  children;
  node?: any;
  isSvg;
  effects = new Set<Effect>();

  create() {
    if ((this.api.renderer as any)._type === "html") {
      this.api.create(this.children, this);
      this.node = this;
    }
    //
    else {
      return this.createDomNode();
    }
  }

  createDomNode() {
    const dom = this.isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", this.tag)
      : document.createElement(this.tag);
    this.node = dom;

    this.api.create(this.children, this);

    dom.append(...this.api.getNodes(this.children));

    const keys = Object.keys(this.props);

    for (const key of keys) {
      const value = this.props[key];
      if (isEventProp(key)) {
        dom.addEventListener(this.getEventTypeFromPropKey(key), value as any);
      }
      //
      else if (key === "node") continue;
      //
      else if (key === "use") {
        if (Array.isArray(value)) {
          for (const useFn of value) {
            this.handleUse(useFn);
          }
        }
        //
        else {
          this.handleUse(value);
        }
      }
      //
      else if (isReactive(value)) {
        const effect = new Effect(
          () => value.value,
          this.api.manager,
          () => {
            this.api.addJob(() => {
              this.setAttributeOrProp(key, value.value);
            });
          }
        );
        this.effects.add(effect);
        effect.run();
        this.setAttributeOrProp(key, value.value);
      } else {
        this.setAttributeOrProp(key, value);
      }
    }

    return dom;
  }

  setAttributeOrProp(key: string, value: any) {
    if (!this.node) return;
    if (key === "style") {
      const keys = Object.keys(value);

      for (const key of keys) {
        let v = value[key];

        if (typeof v === "number") {
          v = `${v}px`;
        }
        this.node.style[key] = v;
      }
    }
    //
    else if (PROP_MAP[key]) {
      (this.node as any)[key] = value;
    }
    //
    else {
      this.node.setAttribute(key, value as any);
    }
  }

  handleUse(useFn: UseFn<any>) {
    // el.onInsert.push(() => {
    //   const r = useFn(el.node);
    //   if (typeof r === "function") {
    //     el.onRemove.push(r);
    //   }
    // });
  }

  getEventTypeFromPropKey(propKey: string) {
    return propKey.slice(2).toLowerCase();
  }

  toHtml() {
    let s = `<${this.tag}`;

    const props: string[] = [];
    for (const [key, value] of Object.entries(this.props)) {
      if (isEventProp(key)) continue;
      if (key === "node") continue;

      const keyAlias = ATTRIBUTE_ALIASES[key];

      let v = value;

      if (key === "style") {
        v = this.styleObjToString(v);
      }

      props.push(`${keyAlias ?? key}="${v}"`);
    }

    if (props.length > 0) {
      s += ` ${props.join(" ")}`;
    }

    if (this.children.length > 0) {
      const childrenString = this.api
        .getNodes(this.children)
        .map((c) => c.toHtml())
        .join("");
      s += `>${childrenString}</${this.tag}>`;
    }
    //
    else {
      s += "/>";
    }

    return s;
  }

  styleObjToString(styleObj: object) {
    return Object.entries(styleObj)
      .map(([key, value]) => {
        let v = value;

        if (typeof v === "number") {
          v = `${v}px`;
        }

        return `${key.replace(
          /[A-Z]/g,
          (match) => `-${match.toLowerCase()}`
        )}:${v}`;
      })
      .join(";");
  }

  destroy() {
    for (const effect of this.effects) {
      effect.destroy();
    }
    this.effects.clear();
    for (const child of this.children) {
      child.destroy();
    }
  }
}

// html props treated as element properties ( not attributes )
const PROP_MAP: any = {
  checked: 1,
  selected: 1,
  type: 1,
  value: 1,
};

const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};
