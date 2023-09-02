import { MintElement } from "./types";

/** An intermediary holder of values from which a MintElement can be created by the Renderer  */
export class MintElementValue<Renderer = any> {
  constructor(toMintElement: (renderer: Renderer) => MintElement) {
    this.toMintElement = toMintElement;
  }
  toMintElement;
}
