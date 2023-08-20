import { MintReactiveElement } from "../../elements";

export const createReactiveElement = (el: MintReactiveElement) => {
  const text = new Text(el.reactive.value);
  el.dom = text;
  const unsub = el.reactive.subscribe(() => {
    if (el.dom) {
      el.dom.textContent = el.reactive.value;
    }
  });
  el.cleanups.add(unsub);

  return [text];
};
