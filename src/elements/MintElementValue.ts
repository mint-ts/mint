import { MintElement } from "./types";

/** This is a holder of values representing a specific MintElement.
 * We have this so that the renderer can control the creation
 * of actual MintElements and can pass them the reference to itself.
 */
export class MintElementValue {
  constructor(public type: MintElement["type"], public data: any) {
    this.type = type;
    this.data = data;
  }
}
