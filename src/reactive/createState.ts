import { Core } from "../core";
import { isShallowEqual } from "../utils";
import { createComputed } from "./createComputed";
import { Computed, State } from "./types";
import { STATE_TYPE } from "./utils";

export const createState = <Value>(args: {
  initialValue: Value;
  core: Core<any, any>;
  addComputed?: (c: Computed<any>) => void;
}): State<Value> => {
  let value = args.initialValue;

  const state: State<Value> = {
    _type: STATE_TYPE,
    get value() {
      return value;
    },
    set value(newValue: Value) {
      const prevValue = value;
      value = newValue;
      if (!isShallowEqual(prevValue, value)) {
        args.core.manager.stateUpdate(state);
      }
    },
    derive<DerivedValue>(deriveFn: (value: Value) => DerivedValue) {
      const computed = createComputed({
        deps: [state],
        computeFn: () => deriveFn(this.value),
        core: args.core,
      });
      args.addComputed?.(computed);
      return computed;
    },
    valueOf() {
      throw new TypeError("Cannot coerce State. Use .value instead.");
    },
  };

  return state;
};
