import { currentComponent } from "../currentComponent";
import { MintElement } from "../elements";
import { filterNodes } from "../utils";
import { IHtmlAPI } from "./types";

export class HtmlAPI implements IHtmlAPI {
  create(el: MintElement): string[] {
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
        let s = `<${el.data.tag}`;

        let props: string[] = [];

        for (const [key, value] of Object.entries(el.data.props)) {
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

        if (el.data.children.length > 0) {
          s += ">";
          for (const child of el.data.children) {
            const childStrArr = this.create(child);

            s += childStrArr.join("");
          }
          s += `</${el.data.tag}>`;
        }
        //
        else {
          s += "/>";
        }

        return [s];
      }
      case "provider": {
        return this.createMultiple(...el.data.children);
      }
      case "text": {
        return [el.data.text];
      }
      case "reactive": {
        el.data.reactive.subscribe(() => {});

        return [el.data.reactive.value];
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
