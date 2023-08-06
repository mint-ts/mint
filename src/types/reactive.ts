import { Computed, State } from "../reactive";

export type Reactive<Value = any> = State<Value> | Computed<Value>;
