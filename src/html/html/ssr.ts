import { MintApi, MintNode } from "../../core";
import { HtmlRenderer } from "./HtmlRenderer";

export const ssr = (node: MintNode) => {
  const api = new MintApi({
    createRenderer: (api) => new HtmlRenderer(api),
  });
  return api.run(node);
};
