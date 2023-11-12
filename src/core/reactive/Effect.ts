import { Computed } from "./Computed";
import { ReactiveManager } from "./ReactiveManager";

export class Effect<T = any> {
  constructor(fn: () => T, manager: ReactiveManager, scheduler: () => void) {
    this.fn = fn;
    this.scheduler = scheduler;
    this._manager = manager;
  }
  fn;
  scheduler;
  computed: Computed<any> | undefined;
  private _manager;
  deps: Set<Effect>[] = [];

  run() {
    this._manager.activeEffect = this;
    const result = this.fn();
    this._manager.activeEffect = undefined;
    return result;
  }

  destroy() {
    const { deps } = this;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(this);
      }
      deps.length = 0;
    }
  }
}
