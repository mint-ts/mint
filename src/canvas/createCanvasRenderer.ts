import { Core } from "../core";
import { isReactive } from "../reactive";
import { MintRenderer } from "../types";
import { getReactiveValue } from "../utils";
import { CanvasAPI } from "./createCanvasAPI";
import { CanvasElement } from "./elements";
import { CanvasNode } from "./types";

export const createCanvasRenderer = (
  core: Core<CanvasElement, CanvasNode>,
  api: CanvasAPI
): MintRenderer<CanvasElement, CanvasNode> => {
  const createNode = (el: CanvasElement) => {
    if (el.tag === "rect") {
      const node = {
        type: "rect",
        props: el.props,
      } as CanvasNode;
      el.node = node;
      return node;
    }
    //
    else if (el.tag === "circle") {
      const nodeProps: Record<string, any> = {};

      for (const [key, value] of Object.entries(el.props)) {
        if (isReactive(value)) {
          core.manager.subscribeConsumer(value, () => {
            // api.draw()
          });
        }
        nodeProps[key] = getReactiveValue(value);
      }

      const node = {
        type: "circle",
        props: nodeProps,
      } as CanvasNode;
      el.node = node;
      return node;
    } else {
      return {} as any;
    }
  };

  return {
    createElement: (node) => {},
    getNode: (el) => {
      return el.node;
    },
    createNode,
    destroyNode: (el) => {},
    insertShowNodes: (el, els) => {},
    patchList: (el) => {},
  };
};
