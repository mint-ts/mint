import { CanvasCircleNode, CanvasNode, CanvasRectNode } from "./types";

export const createCanvasAPI = (ctx: CanvasRenderingContext2D) => {
  const drawRect = (node: CanvasRectNode) => {
    const { x, y, width, height } = node.props;

    ctx.save();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.restore();
  };

  const drawCircle = (node: CanvasCircleNode) => {
    const { x, y, radius } = node.props;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "green";
    ctx.fill();
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = "#003300";
    ctx.stroke();
  };

  return {
    draw(nodes: CanvasNode[]) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (const node of nodes) {
        if (node.type === "rect") {
          drawRect(node);
        } else if (node.type === "circle") {
          drawCircle(node);
        }
      }
    },
  };
};

export type CanvasAPI = ReturnType<typeof createCanvasAPI>;
