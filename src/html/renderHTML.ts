import { MintNode } from "../types";
import { HtmlAPI } from "./HtmlAPI";

export const renderHTML = (node: MintNode) => {
  const htmlAPI = new HtmlAPI();
  return htmlAPI.render(node);
};
