import { Core } from "../../core";
import { MintNode } from "../../types";
import { createHtmlRenderer } from "./createHtmlRenderer";
import { htmlNodesToString } from "./htmlNodesFromMultiple";
import { HtmlNode } from "./types";

export const renderToHtml = (node: MintNode) => {
  const core = new Core<any, HtmlNode>(createHtmlRenderer);
  const elements = core.createElements(node);
  const htmlNodes = core.createNodes(elements);
  return htmlNodesToString(htmlNodes);
};
