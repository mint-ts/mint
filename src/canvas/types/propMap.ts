import { MintReactiveProps } from "../../types";

export type CanvasElementPropMap = {
  rect: CanvasRectProps;
  circle: CanvasCircleProps;
};

type CanvasRectAttributes = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CanvasRectProps = MintReactiveProps<CanvasRectAttributes>;

type CanvasCircleAttributes = {
  x: number;
  y: number;
  radius: number;
};

type CanvasCircleProps = MintReactiveProps<CanvasCircleAttributes>;
