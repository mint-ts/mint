import { getReactiveValue, isReactive } from "../core/utils";
import { CanvasElement } from "./CanvasElement";

export const createCanvasNode = (el: CanvasElement) => {
  const node = {
    tag: el.tag,
    props: {},
  };

  for (const [key, value] of Object.entries(el.props)) {
    if (isReactive(value)) {
      el.core.manager.subscribeConsumer(value, () => {
        el.node.props[key] = getReactiveValue(value);
        el.core.action({});
      });
    }
    node.props[key] = getReactiveValue(value);
  }

  el.node = node;
  return [node];
};
