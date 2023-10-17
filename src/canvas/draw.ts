import { Core } from "../core";
import { createCanvasAPI } from "./createCanvasAPI";
import { createCanvasRenderer } from "./createCanvasRenderer";
import { CanvasElement } from "./elements";
import { CanvasNode } from "./types";

export const draw = (
  elements: CanvasElement[],
  canvas: HTMLCanvasElement,
  parentCore: Core<any, any>
) => {
  const ctx = canvas.getContext("2d")!;
  const canvasAPI = createCanvasAPI(ctx);
  const core = new Core<CanvasElement, CanvasNode>(
    {
      rootNode: 
    }
  );
  const canvasNodes = core.createNodes(elements);
  canvasAPI.draw(canvasNodes);
};
