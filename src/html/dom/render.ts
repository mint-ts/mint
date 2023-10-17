import { Core } from "../../core";
import { MintNode } from "../../types";
import { createHtmlElement } from "../elements";
import { createDomRenderer } from "./createDomRenderer";

export const render = (node: MintNode, container: HTMLElement) => {
  const core = new Core({
    rootNode: node,
    createRenderer: createDomRenderer,
    createRootElement: (rootElements) => {
      return createHtmlElement(
        container.tagName.toLowerCase(),
        {},
        rootElements,
        false
      );
    },
    render: (nodes) => {
      requestAnimationFrame(() => {
        container.innerHTML = "";
        container.append(...nodes);
      });
    },
  });
  core.start();
};
