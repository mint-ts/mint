import { MintApi } from "../MintApi";
import { TYPE_MAP } from "../constants";
import { MintElement } from "../types";

export class ElementFactory {
  constructor(create: CreateFn) {
    this.create = create;
  }
  _type = TYPE_MAP.elFactory;
  create;
}

export type CreateFn = (api: MintApi) => MintElement;
