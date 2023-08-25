import { SubscribeCallback, UnsubscribeFn } from "./types";

export class State<Value = any> {
  constructor(initialValue: Value) {
    this._value = initialValue;
    this._prevValue = this._value;
  }
  private _value;
  private _prevValue;
  private subs = new Set<SubscribeCallback>();

  get value() {
    return this._value;
  }

  set value(value: Value) {
    this._prevValue = this._value;
    this._value = value;
    if (!Object.is(this._prevValue, this._value)) {
      this.notify();
    }
  }

  get prevValue() {
    return this._prevValue;
  }

  private notify() {
    this.subs.forEach((s) => s());
  }

  subscribe(sub: SubscribeCallback): UnsubscribeFn {
    this.subs.add(sub);
    return () => {
      this.subs.delete(sub);
    };
  }

  valueOf() {
    throw new TypeError("Cannot coerce State. Use .value instead");
  }
}
