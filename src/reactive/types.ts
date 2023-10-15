import { Computed } from "./Computed";
import { State } from "./State";

export type Reactive<Value> = State<Value> | Computed<Value>;
