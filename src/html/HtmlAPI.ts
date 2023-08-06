import { currentComponent } from "../currentComponent";
import { MintElement } from "../types";
import { filterNodes } from "../utils";
import { IHtmlAPI } from "./types";

export class HtmlAPI implements IHtmlAPI {
  create(el: MintElement): string[] {
    switch (el.type) {
      case "comp": {
        currentComponent.current = el;
        const elements = filterNodes(el.render(el.props));
        currentComponent.current = undefined;

        elements.forEach((childEl, i) => {
          childEl.parent = el;
          childEl.index = i;
        });

        el.children = elements;

        return this.createMultiple(...el.children);
      }
      case "dom": {
        let s = `<${el.tag}`;

        let props: string[] = [];

        for (const [key, value] of Object.entries(el.props)) {
          if (isEventProp(key)) continue;
          else if (key === "style") {
            props.push(`style="${getStyleStringFromStyleObject(value)}"`);
          }
          //
          else {
            props.push(`${key}="${value}"`);
          }
        }

        if (props.length > 0) {
          s += ` ${props.join(" ")}`;
        }

        if (el.children.length > 0) {
          s += ">";
          for (const child of el.children) {
            const childStrArr = this.create(child);

            s += childStrArr.join("");
          }
          s += `</${el.tag}>`;
        }
        //
        else {
          s += "/>";
        }

        return [s];
      }
      case "frag":
      case "provider": {
        return this.createMultiple(...el.children);
      }
      case "text": {
        return [el.text];
      }
      case "reactive": {
        el.reactive.subscribe(() => {});

        return [el.reactive.value];
      }
      default:
        return [];
    }
  }
  getFirstMountedNode(el: MintElement): string | undefined {
    throw new Error("Method not implemented.");
  }
  getAllMountedNodes(el: MintElement): string[] {
    throw new Error("Method not implemented.");
  }
  destroy(el: MintElement): void {
    throw new Error("Method not implemented.");
  }

  createMultiple(...els: MintElement[]) {
    return els.map((child) => this.create(child)).flat(Infinity) as string[];
  }
}

const isEventProp = (propKey: string) => propKey.indexOf("on") === 0;

const getStyleStringFromStyleObject = (styleObj: any) => {
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
};
