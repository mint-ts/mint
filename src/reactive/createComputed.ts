import { Core } from "../core";
import { isShallowEqual } from "../utils";
import { Computed, Reactive } from "./types";
import { COMPUTED_TYPE } from "./utils";

export const createComputed = <Value>(args: {
  deps: Reactive<any>[];
  computeFn: () => Value;
  core: Core<any, any>;
}): Computed<Value> => {
  let value = args.computeFn();

  const computed: Computed<Value> = {
    _type: COMPUTED_TYPE,
    get value() {
      return value;
    },
    get deps() {
      return args.deps;
    },
    _recompute() {
      const prevValue = value;
      value = args.computeFn();
      return isShallowEqual(prevValue, value);
    },
    valueOf() {
      throw new TypeError("Cannot coerce Computed. Use .value instead.");
    },
  };

  args.core.manager.subscribeComputed(computed);

  return computed;
};
