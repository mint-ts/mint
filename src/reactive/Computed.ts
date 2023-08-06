import { Reactive } from "../types";

export class Computed<Value = any> {
  constructor(reactives: Reactive[], compute: () => Value) {
    this._value = compute();

    reactives.forEach((r) => {
      r.subscribe(() => {
        this._value = compute();
        this.notify();
      });
    });
  }
  private _value;
  private subs = new Set<any>();

  get value() {
    return this._value;
  }

  private notify() {
    this.subs.forEach((s) => s());
  }

  subscribe(sub: any) {
    this.subs.add(sub);
    return () => {
      this.subs.delete(sub);
    };
  }

  valueOf() {
    throw new TypeError("Cannot coerce Computed. Use .value instead");
  }
}
