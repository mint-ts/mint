import { TextElementRenderer } from "../types";

export const createTextElementRenderer = (): TextElementRenderer<Text> => {
  return {
    create({ el }) {
      return [new Text(el.text)];
    },
    destroy({ el }) {
      if (el.node) {
        el.node.remove();
        el.node = undefined;
      }
    },
  };
};
