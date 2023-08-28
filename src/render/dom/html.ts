import { HTMLElementRenderer } from "../types";

export const createHTMLElementRenderer =
  (): HTMLElementRenderer<HTMLElement> => {
    return {
      create({ el }) {
        const dom = document.createElement(el.tag);
        return [dom];
      },
      handleChildNodes({ el, nodes }) {
        el.node?.append(...nodes);
      },
      setEventListener({ el, eventType, eventListener }) {
        el.node?.addEventListener(eventType, eventListener);
      },
      setProp({ el, propKey, propValue }) {
        if (!el.node) return;
        if (propKey === "style") {
          setStyleProp(el.node, propValue);
        }
        //
        else {
          el.node.setAttribute(propKey, propValue);
        }
      },
      destroy({ el }) {
        if (el.node) {
          el.node.remove();
          el.node = undefined;
        }
      },
    };
  };

export const setStyleProp = (node: HTMLElement, styleValue: any) => {
  for (const [key, value] of Object.entries(styleValue as any) as any) {
    let v = value;

    if (typeof v === "number") {
      v = `${v}px`;
    }
    node.style[key] = v;
  }
};
