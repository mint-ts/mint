import { MintApi, MintNode } from "../../core";
import { DomRenderer } from "./DomRenderer";

export const render = (node: MintNode, container: HTMLElement) => {
  const api = new MintApi({
    createRenderer: (api) => new DomRenderer(api, container),
  });
  api.run(node);
};
