import { MintApi } from "../MintApi";
import { Computed } from "./Computed";
import { Effect } from "./Effect";
import { State } from "./State";

export class ReactiveManager {
  constructor(public api: MintApi) {}

  activeEffect: Effect | undefined;

  trackReactive(reactive: State<any> | Computed<any>) {
    if (!this.activeEffect) return;
    if (!reactive._depEffects) {
      reactive._depEffects = this.createDepEffects();
    }
    reactive._depEffects.add(this.activeEffect);
    this.activeEffect.deps.push(reactive._depEffects);
  }

  triggerStateEffects(state: State<any>) {
    this.triggerEffects(state);
    this.api.stateUpdated();
  }

  triggerEffects(reactive: State<any> | Computed<any>) {
    if (!reactive._depEffects || reactive._depEffects.size === 0) return;

    const effects = Array.from(reactive._depEffects);
    for (const effect of effects) {
      if (effect.computed) {
        this.triggerEffect(effect);
      }
    }
    for (const effect of effects) {
      if (!effect.computed) {
        this.triggerEffect(effect);
      }
    }
  }

  triggerEffect(effect: Effect) {
    if (effect !== this.activeEffect) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }

  createDepEffects() {
    return new Set<Effect>();
  }
}
