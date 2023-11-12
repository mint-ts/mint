// import { Core, MintNode, MintParentElement, MintRenderer } from "../core";

// export class CanvasRenderer implements MintRenderer {
//   constructor(node: MintNode, canvas: HTMLCanvasElement) {
//     this.rootNode = node;
//     this.canvas = canvas;
//     this.ctx = canvas.getContext("2d")!;
//     this.core = new Core(this);
//     this.rootElements = this.core.createElements(node);
//   }
//   data?: Record<string, any> | undefined;
//   rootNode;
//   rootElements;
//   canvas;
//   ctx;
//   core;

//   update(): void {
//     this.redraw();
//   }

//   drawRect(rectNode: any) {
//     const { x, y, width, height, fill } = rectNode.props;
//     this.ctx.translate(100, 100);
//     this.ctx.rotate((30 * Math.PI) / 180);
//     this.ctx.rect(x, y, width, height);
//     this.ctx.fillStyle = fill;
//     this.ctx.fill();
//   }

//   drawCircle(node: any) {
//     const { x, y, radius, fill } = node.props;
//     this.ctx.fillStyle = fill;
//     this.ctx.beginPath();
//     const endAngle = Math.PI * 2;
//     this.ctx.ellipse(x, y, radius, radius, 0, 0, endAngle);
//     this.ctx.fill();
//   }

//   redraw() {
//     const nodes = this.core.getAllNodes(this.rootElements);
//     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
//     const len = nodes.length;
//     for (let i = 0; i < len; i++) {
//       this.ctx.save();
//       const node = nodes[i];
//       if (node.tag === "rect") {
//         this.drawRect(node);
//       }
//       if (node.tag === "circle") {
//         this.drawCircle(node);
//       }
//       this.ctx.restore();
//     }
//   }

//   draw() {
//     const nodes = this.core.create(this.rootElements, {
//       children: this.rootElements,
//       index: 0,
//     } as MintParentElement<any>);

//     const len = nodes.length;
//     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
//     for (let i = 0; i < len; i++) {
//       this.ctx.save();
//       const node = nodes[i];
//       if (node.tag === "rect") {
//         this.drawRect(node);
//       }
//       if (node.tag === "circle") {
//         this.drawCircle(node);
//       }
//       this.ctx.restore();
//     }
//   }
// }

export {};
