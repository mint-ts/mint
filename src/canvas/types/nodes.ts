export type CanvasRectNode = {
  type: "rect";
  props: { x: number; y: number; width: number; height: number };
};

export type CanvasCircleNode = {
  type: "circle";
  props: { x: number; y: number; radius: number };
};

export type CanvasNode = CanvasRectNode | CanvasCircleNode;
