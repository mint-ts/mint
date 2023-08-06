import { MintNode } from "../types";
import { filterNodes } from "../utils";
import { HtmlAPI } from "./HtmlAPI";

export const renderHTML = (node: MintNode) => {
  const htmlAPI = new HtmlAPI();

  const elements = filterNodes(node);

  return elements
    .map((el) => htmlAPI.create(el))
    .flat(Infinity)
    .join("");
};
