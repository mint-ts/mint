import { MintNode } from "../../types";
import { HTMLRenderer } from "./HTMLRenderer";

export const renderToHTML = (node: MintNode) => {
  return new HTMLRenderer().render(node);
};
