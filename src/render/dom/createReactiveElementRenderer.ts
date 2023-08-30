import { ReactiveElementRenderer } from "../types";

export const createReactiveElementRenderer =
  (): ReactiveElementRenderer<Text> => {
    return {
      create({ el }) {
        return [new Text(String(el.reactive.value))];
      },
      update({ el, newValue }) {
        if (!el.node) return;
        el.node.textContent = String(newValue);
      },
      destroy(args) {},
    };
  };
