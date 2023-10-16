import { COMPUTED_TYPE, STATE_TYPE } from "./utils";

export type State<Value> = {
  _type: typeof STATE_TYPE;
  get value(): Value;
  set value(value: Value);
  derive<ComputedValue>(
    deriveFn: (value: Value) => ComputedValue
  ): Computed<ComputedValue>;
  valueOf(): void;
};

export type Computed<Value> = {
  _type: typeof COMPUTED_TYPE;
  get value(): Value;
  get deps(): Reactive<any>[];
  _recompute(): boolean;
  valueOf(): void;
};

export type Reactive<Value> = State<Value> | Computed<Value>;
