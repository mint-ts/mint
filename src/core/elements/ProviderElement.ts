import { Context } from "../Context";
import { MintApi } from "../MintApi";
import { TYPE_MAP } from "../constants";
import { MintElement } from "../types";

export class ProviderElement<Value> implements MintElement {
  constructor(
    public context: Context<Value>,
    public value: Value,
    public children: MintElement[],
    public api: MintApi
  ) {}
  _type = TYPE_MAP.provider;
  index = 0;

  create() {}

  destroy(): void {}
}
