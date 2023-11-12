import { MintReactiveProps } from "../core";

export type CanvasElementPropMap = {
  rect: CanvasRectElementProps;
  circle: CanvasCircleElementProps;
};

export type CanvasRectElementProps = MintReactiveProps<{
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: CanvasFillStrokeStyles["fillStyle"];
}>;

export type CanvasCircleElementProps = MintReactiveProps<{
  x: number;
  y: number;
  radius: number;
  fill?: CanvasFillStrokeStyles["fillStyle"];
}>;
