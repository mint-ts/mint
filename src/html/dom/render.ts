import { Core } from "../../core";
import { MintNode } from "../../types";
import { createHtmlElement } from "../elements";
import { createDomRenderer } from "./createDomRenderer";

export const render = (node: MintNode, container: HTMLElement) => {
  const core = new Core(createDomRenderer);

  const elements = core.createElements(node);

  const rootEl = createHtmlElement(
    container.tagName.toLowerCase(),
    {},
    elements,
    false
  );

  const domNodes = core.createNodes(elements, rootEl);

  container.append(...domNodes);
};
