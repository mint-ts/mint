import { currentComponent } from "../../currentComponent";
import { MintComponentElement } from "../../elements";
import { filterNodes, initElementsChildren } from "../../utils";

export const createComponentElement = (el: MintComponentElement) => {
  currentComponent.current = el;
  const elements = filterNodes(el.render(el.props));
  currentComponent.current = undefined;

  initElementsChildren(el, ...elements);

  el.children = elements;
};
