import { Core } from "../core";
import { isShallowEqual } from "../utils";
import { Reactive } from "./types";

export class Computed<Value> {
  constructor(
    deps: Reactive<any>[],
    compute: () => Value,
    core: Core<any, any>
  ) {
    this.__deps = deps;
    this._compute = compute;
    this._value = compute();
    this._core = core;
    this._core.manager.subscribeComputed(this);
  }
  private _core;
  private _value;
  private __deps;
  private _compute;

  get value() {
    return this._value;
  }

  get _deps() {
    return this.__deps;
  }

  _recompute() {
    const prevValue = this._value;
    this._value = this._compute();
    return isShallowEqual(prevValue, this._value);
  }

  valueOf() {
    throw new TypeError("Cannot coerce a Computed object. Use .value instead.");
  }
}
