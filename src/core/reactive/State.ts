import { TYPE_MAP } from "../constants";
import { ReactiveManager } from "./ReactiveManager";
import { DepEffects } from "./types";
import { isEqual } from "./utils";

export class State<Value> {
  constructor(initialValue: Value, manager: ReactiveManager) {
    this._value = initialValue;
    this._manager = manager;
  }
  _type = TYPE_MAP.state;
  private _value;
  private _manager;
  _depEffects: DepEffects | undefined;

  get value() {
    this._manager.trackReactive(this);
    return this._value;
  }

  set value(newValue: Value) {
    if (!isEqual(this._value, newValue)) {
      this._value = newValue;
      this._manager.triggerStateEffects(this);
    }
  }

  valueOf() {
    throw new TypeError("Cannot coerce State. Use .value instead.");
  }
}
