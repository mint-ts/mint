import { currentComponent } from "../../currentComponent";
import { MintDOMElement } from "../../elements";
import { MintNode } from "../../types";
import { filterNodes } from "../../utils";
import { createMultiple } from "./createMultiple";
import { onInsertion } from "./onInsertion";

/** Creates DOM nodes from a MintNode and inserts them into the container element */
export const render = (node: MintNode, container: HTMLElement) => {
  const elements = filterNodes(node);

  const containerEl = new MintDOMElement({
    tag: container.tagName.toLowerCase(),
    props: {},
    children: elements,
  });
  containerEl.dom = container;
  containerEl.isInserted = true;

  const domNodes = createMultiple(...elements);

  currentComponent.current = undefined;

  for (const domNode of domNodes) {
    container.append(domNode);
  }

  onInsertion(...elements);
};
