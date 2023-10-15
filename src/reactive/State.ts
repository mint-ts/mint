import { Core } from "../core";
import { isShallowEqual } from "../utils";
import { Computed } from "./Computed";

export class State<Value> {
  constructor(
    initialValue: Value,
    core: Core<any, any>,
    addComputed?: (c: Computed<any>) => void
  ) {
    this._value = initialValue;
    this._addComputed = addComputed;
    this._core = core;
  }
  private _value;
  private _addComputed;
  private _core;

  get value() {
    return this._value;
  }

  set value(newValue: Value) {
    const prevValue = this._value;
    this._value = newValue;
    if (!isShallowEqual(prevValue, this._value)) {
      this._core.manager.stateUpdate(this);
    }
  }

  derive<DerivedValue>(deriveFn: (value: Value) => DerivedValue) {
    const _computed = new Computed(
      [this],
      () => deriveFn(this.value),
      this._core
    );
    this._addComputed?.(_computed);
    return _computed;
  }

  valueOf() {
    throw new TypeError("Cannot coerce a State object. Use .value instead.");
  }
}
