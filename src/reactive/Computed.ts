import { Reactive } from "../types";
import { SubscribeCallback, UnsubscribeFn } from "./types";

export class Computed<Value = any> {
  constructor(reactives: Reactive[], compute: () => Value) {
    this._value = compute();
    this._prevValue = this._value;

    reactives.forEach((r) => {
      r.subscribe(() => {
        this._prevValue = this._value;
        this._value = compute();
        this.notify();
      });
    });
  }
  private _value;
  private _prevValue;
  private _subs = new Set<SubscribeCallback>();
  public get subs() {
    return this._subs;
  }
  public set subs(value) {
    this._subs = value;
  }

  get value() {
    return this._value;
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
    throw new TypeError("Cannot coerce Computed. Use .value instead");
  }
}
