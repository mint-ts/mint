import { TYPE_MAP } from "../constants";
import { Effect } from "./Effect";
import { ReactiveManager } from "./ReactiveManager";
import { DepEffects } from "./types";

export class Computed<Value> {
  constructor(getter: () => Value, manager: ReactiveManager) {
    this._manager = manager;
    this.effect = new Effect(getter, manager, () => {
      if (!this._dirty) {
        this._dirty = true;
        this._manager.triggerEffects(this);
      }
    });
    this.effect.computed = this;
  }
  _type = TYPE_MAP.computed;
  _value!: Value;
  private _manager;
  effect;
  _dirty = true;
  _depEffects: DepEffects | undefined;

  get value() {
    this._manager.trackReactive(this);
    if (this._dirty) {
      this._dirty = false;
      this._value = this.effect.run()!;
    }
    return this._value;
  }

  valueOf() {
    throw new TypeError("Cannot coerce Computed. Use .value instead.");
  }
}
