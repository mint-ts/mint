import { Computed, Reactive, State } from "../reactive";
import { Subscribers } from "./Subscribers";

export class SubscriptionManager {
  constructor(flushUpdates?: (fns: Function[]) => void) {
    this.flushUpdates = flushUpdates ?? defaultFlushUpdates;
  }
  flushUpdates;
  reg = new Map<Reactive<any>, any>();

  getReactiveSubscribers(r: Reactive<any>) {
    let subs: Subscribers;
    if (!this.reg.has(r)) {
      this.reg.set(r, new Subscribers());
    }
    subs = this.reg.get(r)!;
    return subs;
  }

  subscribeConsumer(reactive: Reactive<any>, fn: () => void) {
    return this.getReactiveSubscribers(reactive).add(fn);
  }

  subscribeComputed(c: Computed<any>) {
    c.deps.forEach((d) => {
      this.getReactiveSubscribers(d).add(c);
    });
  }

  recomputeDeps(r: Reactive<any>) {
    const computed = this.getReactiveSubscribers(r).computed;
    computed.forEach((c) => {
      c._recompute();
      this.recomputeDeps(c);
    });
  }

  getAllConsumers(r: Reactive<any>) {
    let consumers = Array.from(this.getReactiveSubscribers(r).consumers);
    const computed = this.getReactiveSubscribers(r).computed;
    computed.forEach((d) => {
      consumers = [...consumers, ...this.getReactiveSubscribers(d).consumers];
    });
    return consumers;
  }

  stateUpdate(state: State<any>) {
    this.recomputeDeps(state);
    this.flushUpdates(this.getAllConsumers(state));
  }

  deleteMany(...reactives: Reactive<any>[]) {
    for (let r of reactives) {
      this.reg.delete(r);
    }
  }
}

const defaultFlushUpdates = (fns: Function[]) => {
  fns.forEach((fn) => fn());
};
