// export const draw = (
//   elements: CanvasElement[],
//   canvas: HTMLCanvasElement,
//   parentCore: Core<any, any>
// ) => {
//   const ctx = canvas.getContext("2d")!;
//   const canvasAPI = createCanvasAPI(ctx);
//   const core = new Core<CanvasElement, CanvasNode>((core) =>
//     createCanvasRenderer(core, canvasAPI)
//   );
//   const canvasNodes = core.createNodes(elements);
//   canvasAPI.draw(canvasNodes);
// };

export {};
