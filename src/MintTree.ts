// nodesToElements(...nodes: MintNode[]) {
//   const elements: MintElement[] = [];

//   for (const node of nodes.flat(Infinity as 1)) {
//     if (isEmptyNode(node)) continue;
//     if (isTextNode(node)) {
//       elements.push(new MintTextElement(String(node), this));
//     }
//     //
//     else if (isReactive(node)) {
//       elements.push(new MintReactiveElement(node, this));
//     }
//     //
//     else if (node instanceof MintElementValue) {
//       switch (node.type) {
//         case "dom": {
//           elements.push(
//             new MintHTMLElement({
//               ...node.data,
//               children: this.nodesToElements(...node.data.children),
//               tree: this,
//             })
//           );
//           break;
//         }
//         case "show": {
//           elements.push(
//             new MintShowElement({
//               ...node.data,
//               yes: this.nodesToElements(node.data.yes),
//               no: this.nodesToElements(node.data.no),
//               tree: this,
//             })
//           );
//           break;
//         }
//         case "list": {
//           elements.push(
//             new MintListElement({
//               ...node.data,
//               tree: this,
//             })
//           );
//           break;
//         }
//         case "component": {
//           elements.push(
//             new MintComponentElement({
//               ...node.data,
//               tree: this,
//             })
//           );
//           break;
//         }
//         case "provider": {
//           elements.push(
//             new MintProviderElement({
//               ...node.data,
//               children: this.nodesToElements(...node.data.children),
//               tree: this,
//             })
//           );
//           break;
//         }
//       }
//     }
//   }

//   return elements;
// }

export {};
