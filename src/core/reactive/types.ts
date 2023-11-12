import { Computed } from "./Computed";
import { Effect } from "./Effect";
import { State } from "./State";

export type Reactive<Value> = State<Value> | Computed<Value>;

export type ComputeFn<Value, Deps> = (values: Deps) => Value;

export type DepEffects = Set<Effect>;
