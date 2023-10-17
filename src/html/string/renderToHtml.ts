import { Core } from "../../core";
import { MintNode } from "../../types";
import { createHtmlElement } from "../elements";
import { createHtmlRenderer } from "./createHtmlRenderer";
import { htmlNodesToString } from "./htmlNodesFromMultiple";
import { HtmlNode } from "./types";

export const renderToHtml = (node: MintNode) => {
  const core = new Core<any, HtmlNode>({
    rootNode: node,
    createRenderer: createHtmlRenderer,
    createRootElement: (rootElements) => {
      return createHtmlElement("div", {}, rootElements, false);
    },
    render: (nodes) => {
      return htmlNodesToString(nodes);
    },
  });
  return core.start();
};
